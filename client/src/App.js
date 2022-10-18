import './App.css';
import React from 'react';

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function App() {
  const [route, setRoute] = React.useState({});
  const [addresses, setAddresses] = React.useState(['Miami,Florida', 'Springfield,Illinois', 'Atlanta,Georgia', 'Houston,Texas', 'Sacramento,California']);

  const getRoute = async (addresses) => {
    try {
      const res = await fetch ('http://localhost:8080/route', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({addresses: addresses})
      });
      if (res.status != 200) {
        console.log(res.status);
        console.log(res.statusText);
        return;
      }
      return await res.json()
    } catch (err) {console.log(err);};
  }

  React.useEffect(() => {
    // getRoute(addresses).then(res => {
    //   setRoute(res);
    // }).catch(err => console.log(err));
  }, []);

  return (
    <div className='App'>
      <div>
        <a href="/">Sign in</a>
      </div>

      <div className='About'>
        <h1>About</h1>
        <p>
          This web app was made to find the best route on a birthday restaurant spree.
          A route consists of a starting location, a set amount of stops, and a recall to the start.
          We define the best route as the route with the least amount of travel time
          after the first stop. This is helpful for time sensitive food delivery.
          The Bing Maps API is used to fetch the paths between locations.
        </p>
        
      </div>
      {/* <h1>{secondsToDhms(route.time)}</h1>
      {route.route?.map((location, index) => (<p key={index}>{location}</p>))} */}
      <div className="LocationInput">
        <h1>Add your locations</h1>
        <input type="text"></input>
        <button>+</button>

        <h3>Optimal route</h3>
        <button>Calculate</button>
      </div>

      <div className="Routes">
        <h1>Your saved routes</h1>
      </div>
      
    </div>
  );
}

export default App;
