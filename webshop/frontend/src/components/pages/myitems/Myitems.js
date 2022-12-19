import {useState, useEffect} from 'react';
import AddListingInputForm from '../shop/AddListingInputForm';
import ListingContainer from '../shop/ListingContainer';
import InactiveListing from './InactiveListing';

function Myitems() {

    const [listings, setListings] = useState([]);
    const [soldListings, setSoldListings] = useState([]);
    const [boughtListings, setBoughtListings] = useState([]);

    let listingList = [];
    let soldListingsList = [];
    let boughtListingsList = [];

    listingList = listings.map(listing => (
        <InactiveListing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ))

    soldListingsList = soldListings.map(listing => (
        <InactiveListing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ))

    boughtListingsList = boughtListings.map(listing => (
        <InactiveListing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
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

    const fetchSoldItems = () => {
        fetch('http://127.0.0.1:8000/api/myitems/sold/', {
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
                setSoldListings(data.results)
            })
            .catch(err => {
                console.log("Error: ", err.response.status, err.response.statusText);
            })
        console.log("Fetching own listings DONE");
    }

    const fetchBoughtItems = () => {
        fetch('http://127.0.0.1:8000/api/myitems/purchased/', {
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
                setBoughtListings(data.results)
            })
            .catch(err => {
                console.log("Error: ", err.response.status, err.response.statusText);
            })
        console.log("Fetching own listings DONE");
    }

    useEffect(() =>{
        console.log("App changed");
        fetchMyItems();
        fetchSoldItems();
        fetchBoughtItems();
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
                <h3 className='Listings'>Own listings for sale: {listingList.length}</h3>
                <ListingContainer listings={listingList}></ListingContainer>
            </div>
            <div>
                <h4 className='Listings'>Create new listing:</h4>
                <AddListingInputForm text={"Create new listing"} AddListing={addListing}></AddListingInputForm>
            </div>
            <div>
                <h3 className='Listings'>Sold listings: {soldListingsList.length}</h3>
                <ListingContainer listings={soldListingsList}></ListingContainer>
            </div>
            <div>
                <h3 className='Listings'>Bought listings: {boughtListingsList.length}</h3>
                <ListingContainer listings={boughtListingsList}></ListingContainer>
            </div>
        </div>
    );
}

export default Myitems;