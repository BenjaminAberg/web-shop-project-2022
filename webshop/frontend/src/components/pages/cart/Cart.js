import {useState} from "react";

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
                console.log(data)
                setCartListings(data)
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

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

    const deleteListing = (id) => {

    }

    const deleteAll = () => {

    }

    return (
        <div>
            <button onClick={fetchCart}>Fetch cart</button>
        </div>
    )
}

export default Cart;