import {useState, useEffect} from "react";
import CartListing from "./CartListing";
import CartListingContainer from "./CartListingContainer";

function Cart(props){

    const [cartListings, setCartListings] = useState([])
    //const [cartTotal, setCartTotal] = useState(0);

    let listingList = [];
    let cartTotal = 0;

    listingList = cartListings.map(listing => (
        <CartListing id={listing.id} title={listing.title} price={listing.price}/>
    ));
    
    cartTotal = cartListings.map(listing => (
        cartTotal + parseInt(listing.price)
    ))

    cartTotal = cartTotal.reduce((a, b) => a + b, 0);

    const fetchCart = () => {
        fetch(' http://127.0.0.1:8000/api/cart/', {
            method: 'GET',
            headers: {
                'Authorization' : 'Token ' + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            },
        })
            .then(response => {
                 if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then( data => {
                setCartListings(data.results);
            })
            .catch(err => {
                console.log("Error: ", err);
                setCartListings([]);
            })
    }

    useEffect(() =>{
        console.log("App changed");
        fetchCart();
    }, [])

    const deleteAll = () => {
        fetch(' http://127.0.0.1:8000/api/cart/delete/', {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Token ' + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            },
        })
            .then(response => {
                 if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then( data => {
                console.log(data);
                setCartListings([]);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    const makePayment = () => {

        let listing_ids = [];

        listing_ids = cartListings.map(listing => (
            listing.id
        ))

        for (const [index, id] of listing_ids.entries()) {

            console.log(index);

            fetch(' http://127.0.0.1:8000/api/cart/purchase/' + id, {
            method: 'POST',
            headers: {
                'Authorization' : 'Token ' + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            },
        })
            .then(response => {
                 if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then( data => {
                console.log(data);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
        }

        fetchCart();
        setCartListings([]);
    }

    if (cartListings.length === 0) {
        return <div className="Listings">
                    <h5>You currently don't have any items in the cart.</h5>
                    <button onClick={fetchCart}>Update cart</button>    
                </div>
    }
    else { 
        return <div>
                    <CartListingContainer listings={listingList}></CartListingContainer>
                    <h5 className="Listings">Total: {cartTotal}€</h5>
                    <button class='Cart-button' onClick={makePayment}>Make payment</button>
                    <button class='Cart-button' onClick={deleteAll}> Empty cart</button>
                    <button class='Cart-button' onClick={fetchCart}>Update cart</button>
                </div>
    }    
}

export default Cart;