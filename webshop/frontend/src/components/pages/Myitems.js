import {useState, useEffect} from 'react';
import AddListingInputForm from './AddListingInputForm';
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

    const addListing = (addTitle, addDescription, addPrice) => {
        fetch(' http://127.0.0.1:8000/api/myitems/addlisting/', {
            method: 'POST',
            headers: {
                'Authorization' : 'Token ' + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: addTitle,
                description: addDescription,
                price: addPrice })
        })
            .then(response => {
                if(!response.ok){
                    console.log(addPrice);
                    throw new Error("http error: " + response.statusCode);
                }
                return response.json()
            })
            .then( data => {
                console.log(data);
            })
            .catch(response => {
                console.log("Error: ", response.status, response.statusText);
         })
    }

    return (
        <div>
            <div>
                <h3 className='Listings'>Own listings:</h3>
                <ListingContainer listings={listingList}></ListingContainer>
            </div>
            <div>
                <h4 className='Listings'>Create new listing:</h4>
                <AddListingInputForm text={"Create new listing"} AddListing={addListing}></AddListingInputForm>
            </div>
        </div>
    );
}

export default Myitems;