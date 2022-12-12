
function ListingContainer(props){
    const ccStyle ={
        border: "black solid 1px",
        width: '80vw',

    }
    return (
        <div style={ccStyle}>
            <h1>Listings:</h1>
            <div style={{display:'flex', flexWrap: 'wrap'}}>
                {props.listings}
            </div>

        </div>
    )
}

export default ListingContainer;