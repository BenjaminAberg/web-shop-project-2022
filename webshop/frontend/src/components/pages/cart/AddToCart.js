

function AddToCart(props) {

    const addToCart = (item_id) => {

        console.log(props);
        fetch(' http://127.0.0.1:8000/api/cart/add/' + item_id, {
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
                console.log(data)
            })
            .catch(err => {
                console.log("Error: ", err);
            })

    }

    return <button className="Listing-button" onClick={() => addToCart(props.id)}>Add to cart</button>
}

export default AddToCart;