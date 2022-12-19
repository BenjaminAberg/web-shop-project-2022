import {useState, useEffect} from "react";
import CartListing from "./CartListing";
import CartListingContainer from "./CartListingContainer";


function Cart(props){

    const [cartListings, setCartListings] = useState([]);

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
                return response
            })
            .then( data => {
                console.log(data);
                setCartListings([]);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    async function finalizeTransaction(listing_ids, listing_prices) {

        let errors = [];

        for (let i = 0; i < listing_ids.length; i++) {
            const [transactionResponse] = await Promise.all([
                fetch(' http://127.0.0.1:8000/api/cart/purchase/' + listing_ids[i] + '/' + listing_prices[i], {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Token ' + localStorage.getItem("token"),
                        'Content-Type' : 'application/json'
                    },
                    })
            ])

            const transaction = await transactionResponse;

            if (transaction.status !== 200) {
                errors.push("errors happened");
            }
        }

        if (errors.length === 0) {
            fetchCart();
            setCartListings([]);
            window.location.reload(true);
            alert("Transaction complete!");
        }
    }

    async function handlePayment() {

        let listing_ids = [];
        let listing_prices = [];
        let listing_titles = [];
        let new_prices = [];
        let price_changed = [];
        let price_changed_titles = [];
        let sold_status = [];
        let sold_listings = [];
        let sold_titles = [];

        let allListingsAvailable = false;
        let allPricesSame = false;

        listing_ids = cartListings.map(listing => (
            listing.id
        ))

        listing_prices = cartListings.map(listing => (
            listing.price
        ))

        listing_titles = cartListings.map(listing => (
            listing.title
        ))

        for (let i = 0; i < listing_ids.length; i++) {
            const [priceResponse, availableResponse] = await Promise.all([
                fetch(' http://127.0.0.1:8000/api/listings/getprice/' + listing_ids[i]),
                fetch(' http://127.0.0.1:8000/api/listings/' + listing_ids[i])
            ])
            const price = await priceResponse.json();
            const availability = await availableResponse.json();

            new_prices.push(price);
            sold_status.push(availability.sold);
        }
        
        for (let i = 0; i < listing_ids.length; i++) {
            if (sold_status[i] === true) {
                sold_listings.push(listing_ids[i]);
                sold_titles.push(listing_titles[i]);
            }

            if (listing_prices[i] !== new_prices[i]) {
                price_changed[listing_ids[i]] = new_prices[i];
                price_changed_titles.push(listing_titles[i]);
            }
        }

        if (sold_listings.length === 0) {
            allListingsAvailable = true;

        } else {
            alert("The following listings are no longer available for purchase: " + sold_titles 
            + ". Please remove them from the cart to continue transaction.");
        }

        if (price_changed.length === 0) {
            allPricesSame = true;
        } else {
            alert("Listing prices changed for the following listings: " + price_changed_titles 
            + ". Please update the cart to see current prices.");
        }

        if (allListingsAvailable && allPricesSame) {finalizeTransaction(listing_ids, listing_prices);}

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
                    <button class='Cart-button' onClick={handlePayment}>Make payment</button>
                    <button class='Cart-button' onClick={deleteAll}> Empty cart</button>
                    <button class='Cart-button' onClick={fetchCart}>Update cart</button>
                </div>
    }    
}

export default Cart;