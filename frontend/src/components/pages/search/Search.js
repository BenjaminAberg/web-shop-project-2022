import {useState} from 'react';
import Listing from "../shop/Listing";
import ListingContainer from "../shop/ListingContainer";
import SearchInputForm from './SearchInputForm';
import LoadMoreSearch from './LoadMoreSearch';

// Handle search functionality
function Search() {

    const [searchListings, setSearch] = useState([]);
    const [searchParam, setSearchParam] = useState("")

    let searchList = [];

    searchList = searchListings.map(listing => (
        <Listing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ))

    // Fetch items containing search term in title
    const search = (search_term) => {

        fetch(' http://127.0.0.1:8000/api/search/' + search_term, {
            method: 'GET',
            headers: {
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
                setSearch(data.results);
                setSearchParam(search_term)
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    if (!searchParam) return <div><SearchInputForm text={"Search"} Search={search}></SearchInputForm></div>
    
    else return (
        <div>
            <div>
                <SearchInputForm text={"Search"} Search={search}></SearchInputForm>
            </div>
            <div>
                <h3 className='Listings'>Listings containing search term "{searchParam}":</h3>
                <ListingContainer listings={searchList}></ListingContainer>        
            </div>
            <div>
                <LoadMoreSearch searchTerm={searchParam}></LoadMoreSearch>
            </div>
        </div>
    )
}

export default Search;