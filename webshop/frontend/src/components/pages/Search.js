import {useState} from 'react';
import Listing from './Listing';
import ListingContainer from './ListingContainer';
import SearchInputForm from './SearchInputForm';


function Search() {

    const [searchListings, setSearch] = useState([]);
    const [searchParam, setSearchParam] = useState("")

    let searchList = [];

    searchList = searchListings.map(listing => (
        <Listing title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}/>
    ))

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
        </div>
    )
}

export default Search;