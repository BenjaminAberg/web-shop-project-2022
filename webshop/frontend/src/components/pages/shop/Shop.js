import {useState, useEffect} from 'react';
import Listing from './Listing';
import ListingContainer from './ListingContainer';

// Handle frontpage at "/shop"
function Shop() {

    const [listings, setListings] = useState([]);

    let listingList = [];

    listingList = listings.map(listing => (
        <Listing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ));

    // Fetch all listings currently available
    const fetchListings = () => {
        console.log("Fetching listings");
        fetch('http://127.0.0.1:8000/api/listings')
            .then( response => {
                if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then(data => {
                setListings(data.results);
            })
            .catch(err => console.log("Error: ", err))
        console.log("Fetching listings DONE");
    }
    
    useEffect(() =>{
        console.log("App changed");
        fetchListings();
    }, [])

    return (
      <div>
          <div>
            <h3 className='Listings'>All webshop listings:</h3>
            <ListingContainer listings={listingList}></ListingContainer>
        </div>
      </div>
    );
}
  
export default Shop;