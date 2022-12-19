
function CartListingContainer(props){
    return (
        <div>
            <h5 key={props.id}>{props.listings}</h5>
        </div>
    )
}

export default CartListingContainer;