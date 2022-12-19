

function CartListing(props){
    const cStyle = {
        width: '270px',
        height: '50px',
        margin: '15px',
    }
    return (
        <div style={cStyle}>
            <Label label={props.title}></Label>
            <PriceTag price={props.price}></PriceTag>
        </div>
    )
}

function PriceTag(props){
    const sStyle = {
        width: '270px',
        height: '20px',
    }

    return (<div style={sStyle}>
                {props.price}€
            </div>
    )
}

function Label(props){
    const lStyle = {
        width: '270px',
        height: '30px',
    }
     return <div style={lStyle}><h3>{props.label}</h3></div>
}

export default CartListing;