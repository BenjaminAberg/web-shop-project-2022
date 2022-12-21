
// Edit listing functionality

import EditListingInputForm from "./EditListingInputForm"

function EditListing(props) {
    const editListing = (listing_id, title, description, price) => {
        console.log(title);
        fetch(' http://127.0.0.1:8000/api/myitems/editlisting/' + listing_id, {
            method: 'PUT',
            headers: {
                'Authorization' : 'Token ' + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'title': title, 
                'description': description, 
                'price': price
            })
        })
            .then(response => {
                if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response
            })
            .then( data => {
                window.location.reload(true);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    return(
        <div>
            <EditListingInputForm id={props.id} title={props.title} description={props.description} EditListing={editListing}></EditListingInputForm>
        </div>
    )
}

export default EditListing;