import './App.css'
import {useState, useEffect} from 'react';
import Listing from './components/Listing';
import ListingContainer from './components/ListingContainer';

function App() {

  let listingList = [];

  function setListingList(data) {
    listingList = data;
  }

  const fetchApi = () => {
    console.log("Fetching listings");
    fetch('http://127.0.0.1:8000/listings')
        .then( response => {
            if(!response.ok){
                throw new Error("http error: " + response.statusCode)
            }
            return response.json()
        })
        .then(data => setListingList((
            data.response
        )))
        .catch(err => console.log("Error: ", err))
    console.log("Fetching listings DONE");
  }
  
  useEffect(() =>{
    console.log("App changed");
    fetchApi();
  }, [])

  return (
    <div>
        <div className="App">
            <ListingContainer listings={listingList}></ListingContainer>
            <button onClick={fetchApi} >Fetch from API</button>
        </div>
    </div>
  );
}
  
export default App;