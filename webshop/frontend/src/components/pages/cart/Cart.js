import {useState, useEffect} from "react";
import CartListing from "./CartListing";
import CartListingContainer from "./CartListingContainer";

function Cart(props){

    const styleHidden={
        backgroundColor:' yellow',
        border: '1px solid black',
        width: '20vw',
        maxWidth:'300px',
        minWidth: '200px',
    }

    const styleView={
        backgroundColor:' green',
        border: '1px solid black',
        width: '20vw',
        maxWidth:'300px',
        minWidth: '200px',
        height: '100px'
    }

    const [hide, setHide] = useState(true);
    const [cartStyle, setCartStyle] = useState(styleHidden);
    const [cartListings, setCartListings] = useState([])

    let listingList = [];

    listingList = cartListings.map(listing => (
        <CartListing id={listing.id} title={listing.title} price={listing.price}/>
    ));

    console.log(listingList);

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

    const hideHandler = (e) => {
        if (hide === false){
            setHide(true);
            setCartStyle(styleHidden);
        }
        else {
            setHide(false);
            setCartStyle(styleView);
        }
    }

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

    console.log(listingList.map(listing => {
        return(listing.id, listing.title, listing.price)}))

    return <div>
            <CartListingContainer listings={listingList}></CartListingContainer>
            <button class='Empty-cart-button' onClick={deleteAll}> Empty cart</button>
            <button onClick={fetchCart}>Update cart</button>
        </div>
}

export default Cart;