import {useState} from "react";

function SearchInputForm(props){

    const [search, setSearch] = useState('');

    function updateSearch(e){
        setSearch(e.target.value);
    }

    return (
        <div className="Listings">
            <label>
                Search webshop:  <input type='text' value={search} onChange={updateSearch}/>
            </label>
            <button onClick={() => props.Search(search)}>Search</button>
        </div>
    )
}

export default SearchInputForm;