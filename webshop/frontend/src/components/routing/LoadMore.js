import Listing from "../pages/shop/Listing";
import ListingContainer from "../pages/shop/ListingContainer";
import {useState, useEffect} from 'react';

// Handle load more functionality
function LoadMore() {

    const apiuri = "http://127.0.0.1:8000/api/listings";

    const [listings, setListings]= useState([]);
    const [loadMore, setLoadMore] = useState(apiuri);
    const [prevPage, setPrev] = useState(null);

    let listingList = [];

    listingList = listings.map((listing) => 
                <Listing id={listing.id} title={listing.title} description={listing.description} price={listing.price} created_at={listing.created_at}></Listing>)

    // Fetch next page
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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