import './App.css';
import {useState, useEffect} from 'react';
import Listing from './components/Listing';
import ListingContainer from './components/ListingContainer';

function App() {

    const [listings, setListings] = useState([]);

    let listingList = [];

    listingList = listings.map((title, description) => (
      <Listing title={title} description={description}/>
    ))

    const fetchListings = () => {
        console.log("Fetching listings");
        fetch('http://127.0.0.1:8000/listings')
            .then( response => {
                if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then(data => setListings((
              prev => data.results.map(p => p.title)
      
          )))
            .catch(err => console.log("Error: ", err))
        console.log("Fetching listings DONE");
    }
    
    useEffect(() =>{
        console.log("App changed");
        fetchListings();
    }, [])

    return (
      <div>
          <div className="App">
            <ListingContainer listings={listingList}></ListingContainer>
          </div>
          <button onClick={fetchListings}>Fetch listings from API</button>
      </div>
    );
}
  
export default App;