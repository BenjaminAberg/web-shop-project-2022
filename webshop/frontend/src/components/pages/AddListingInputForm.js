import {useState} from "react";


function AddListingInputForm(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    function updateTitle(e) {
        setTitle(e.target.value);
    }

    function updateDescription(e) {
        setDescription(e.target.value);
    }

    function updatePrice(e) {
        setPrice(e.target.value);
    }

    return (
        <div className='Listings'>
            <label>
                Title:  <input type='text' value={title} onChange={updateTitle} required />
                Description:  <input type='text' value={description} onChange={updateDescription} required />
                Price:  <input type='text' value={price} onChange={updatePrice} required />
            </label>
            <button onClick={() => props.AddListing(title, description, price)}>{props.text}</button>
        </div>
    )
}

export default AddListingInputForm;