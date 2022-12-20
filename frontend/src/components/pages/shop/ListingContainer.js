
// Container for viewing multiple listings
function ListingContainer(props){
    const ccStyle ={
        display: "flex",

    }
    return (
        <div style={ccStyle}>
            <div style={{display:'flex', flexWrap: 'wrap'}}>
                {props.listings}
            </div>
        </div>
    )
}

export default ListingContainer;