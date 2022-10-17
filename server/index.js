// importing modules
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const getTravelTime = async (online, address1, address2) => {
    if (!online) return Math.floor(Math.random() * 100000);
    let res = await fetch(`http://dev.virtualearth.net/REST/v1/Routes?wp.0=${address1}&wp.1=${address2}&key=${process.env.BING_MAPS_API_KEY}`);
    let json = await res.json();
    let travelDuration = json.resourceSets[0].resources[0].travelDuration;
    return travelDuration;
};

const getRouteGraph = async (online, addresses) => {
    let routeMaps = {};
    for (let i=0; i< addresses.length; i++) {
        routeMaps[addresses[i]] = {};
    }

    let promises = [];
    for (let i=0; i<addresses.length; i++) {
        for (let j=0; j<addresses.length; j++) {
            if (i==j) continue;
            let promise = getTravelTime(online, addresses[i], addresses[j]);
            promise.then(t => {
                routeMaps[addresses[i]][addresses[j]] = t;
            }).catch(e => console.log(e));
            promises.push(promise);
        }
    }

    await Promise.all(promises);
    return routeMaps;
};

const calculateOptimalRoute = (addresses, routeGraph) => {
    // we want to optimize for least time on the road after the first stop has been reached
    // we return to our starting point

    // now i'm thinking depth first search, saving a distance for each route,
    // and pruning based off of a minimum distance

    // create backtrack function first
    const backtrack = (currentTravelDuration, currentRoute, unvisitedLocations) => {
        // prune or reached depth?
        if (currentTravelDuration > minTravelDuration) return;
        if (currentRoute.length == addresses.length) {
            minTravelDuration = currentTravelDuration;
            optimalRoute = currentroute;
            return;
        }

        // explore every possible next step
        let lastLocation = currentRoute[currentRoute.length-1];
        for (let i = 0; i<unvisitedLocations.length; i++) {
            let nextLocation = unvisitedLocations[i];

            currentRoute.push(nextLocation);
            currentTravelDuration += routeGraph[lastLocation][nextLocation];
            backtrack(currentTravelDuration, [...currentRoute], [...unvisitedLocations]);
            currentRoute.pop();
            currentTravelDuration -= routeGraph[lastLocation][nextLocation];
        }
    };

    // set up state
    let minTravelDuration = Number.MAX_VALUE;
    let optimalRoute = [];

    // search every possibility


    return [];
};

let myAddresses = ['Miami,Florida', 'Springfield,Illinois', 'Atlanta,Georgia', 'Houston,Texas', 'Sacramento,California'];
let online = false;

let routeGraph = await getRouteGraph(online, myAddresses);
console.log(routeGraph);
let optimalRoute = await calculateOptimalRoute(myAddresses, routeGraph);
console.log(optimalRoute);


// app
// const app = express();


// // db
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('DB CONNECTED')).catch(err => console.log('DB CONNECTION ERROR', err));
    

// // middleware
// app.use(morgan('dev'));
// app.use(cors({origin: true, credentials: true }));


// // routes
// const router = express.Router();

// router.get('/test', async (req, res) => {
//     res.status(200).json({
//         message: 'Test  API is working!',
//     });
// });

// //router.get('/route', async)

// // use the routes
// app.use('/', router);


// // port
// const port = process.env.PORT || 8080;


// // listener
// const server = app.listen(port, () => console.log(`Server is running on port: ${port}`));