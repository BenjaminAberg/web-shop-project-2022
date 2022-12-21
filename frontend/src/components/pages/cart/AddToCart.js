
// Add to cart functionality

function AddToCart(props) {

    const addToCart = (listing_id) => {

        fetch(' http://127.0.0.1:8000/api/cart/add/' + listing_id, {
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
                return response
            })
            .then( data => {
                console.log(data)
            })
            .catch(err => {
                console.log("Error: ", err);
                alert("You cannot add your own listing to the cart.")
            })
    }

    return(
        <div>
            <button onClick={() => addToCart(props.id)}>Add to cart</button>
        </div>
    )
}

export default AddToCart;