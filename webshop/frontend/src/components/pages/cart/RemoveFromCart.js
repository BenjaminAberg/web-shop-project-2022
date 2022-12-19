

function RemoveFromCart(props) {
    const removeFromCart = (listing_id) => {
        fetch(' http://127.0.0.1:8000/api/cart/remove/' + listing_id, {
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
                console.log(data)
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    return(
        <div>
            <button onClick={() => removeFromCart(props.id)}>x</button>
        </div>
    )
}

export default RemoveFromCart;