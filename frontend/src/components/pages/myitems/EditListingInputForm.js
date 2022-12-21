import {useState} from "react";

// Register input fields
function EditListingInputForm(props){

    const buttonStyle = {
        width: '100px'
    }

    const priceStyle = {
        width: '60px'
    }

    const id = props.id;
    const title = props.title;
    const description = props.description;
    const [price, setPrice] = useState('');

    function updatePrice(e){
        setPrice(e.target.value);
    }

    return (
        <div className="edit-price">
            <label>
                New price:  <input style={priceStyle} type='text' value={price} onChange={updatePrice}/>
            </label>&nbsp;&nbsp;
            <button style={buttonStyle} onClick={() => props.EditListing(id, title, description, price)}>Set new price</button>
        </div>
    )
}

export default EditListingInputForm;