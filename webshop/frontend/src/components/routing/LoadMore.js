import Listing from "../pages/Listing";
import ListingContainer from "../pages/ListingContainer";
import {useState, useEffect} from 'react';

function LoadMore() {

    const apiuri = "http://127.0.0.1:8000/api/listings";

    const [listings, setListings]= useState([]);
    const [loadMore, setLoadMore] = useState(apiuri);
    const [prevPage, setPrev] = useState(null);

    let listingList = [];

    listingList = listings.map((listing) => 
                <Listing title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}></Listing>)

    const fetchMore = (page) => {

        fetch(page)
            .then(response => {
                if (!response.ok) {
                    let err = new Error('Error in request');
                    throw err;
                }
                return response.json();
            })
            .then((data) => {
                setPrev(data.previous);
                setLoadMore(data.next);
                if (page !== apiuri) setListings([...listings, ...data.results]);
            })
            .catch(err => {
                console.log("ERROR: ", err.name, err.message);
            })
    }

    useEffect(() => {
        fetchMore(loadMore);
    }, []);

    return (
        <div>
            <div>
                {prevPage !== null && <ListingContainer listings={listingList}></ListingContainer>}
            </div>
            <div>
                {loadMore && <button className="load-more-button" onClick={() => fetchMore(loadMore)}>Load more</button>}
            </div>
        </div>
    )
}

export default LoadMore;