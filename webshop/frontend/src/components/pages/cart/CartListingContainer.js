
function CartListingContainer(props){
    const ccStyle ={
        display: "flex",

    }
    return (
        <div style={ccStyle}>
            <div style={{display:'flex', flexWrap: 'wrap'}}>
                <h5>{props.listings}</h5>
            </div>
        </div>
    )
}

export default CartListingContainer;