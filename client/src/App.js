import './App.css';
import React from 'react';

function App() {
  const [data, setData] = React.useState('hello');

  const getTest = async () => {
    try {
      const res = await fetch('http://localhost:8080/test', {
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await res.json();
    } catch (err) {console.log(err);};
  };

  // const getRoute = async () => {
  //   try {
  //     const res = fetch ('url', {
  //       addresses
  //     })
  //     return res.json
  //   } catch (err) {console.log(err);};
  // }

  React.useEffect(() => {
    getTest().then(res => {
      setData(res.message);
    }).catch(err => console.log(err));
  });

  return (
    <div className='App'>
      <h1>{data}</h1>
      {/* <div>{route}</div> */}
    </div>
  );
}

export default App;
