import {useState, useEffect} from 'react';
import Listing from './Listing';
import ListingContainer from './ListingContainer';

function Myitems() {

    const [listings, setListings] = useState([]);

    let listingList = [];

    listingList = listings.map(listing => (
        <Listing title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ))

    const fetchMyItems = () => {
        fetch('http://127.0.0.1:8000/api/myitems/', {
            method: 'GET',
            headers: {
                'Authorization' : 'Token '+ localStorage.getItem("token"),
                'Content-Type' : 'application/json'
                },
            },)
            .then( response => {
                if(!response.ok){
                    let err = new Error("http error: " + response.statusCode);
                    err.response = response;
                    throw err
                }
                return response.json()
            })
            .then(data => {
                setListings(data.results)
            })
            .catch(err => {
                console.log("Error: ", err.response.status, err.response.statusText);
            })
        console.log("Fetching own listings DONE");
    }

    useEffect(() =>{
        console.log("App changed");
        fetchMyItems();
    }, [])

    return (
        <div>
            <h3 className='Listings'>Own listings:</h3>
            <ListingContainer listings={listingList}></ListingContainer>
        </div>
    );
}

export default Myitems;