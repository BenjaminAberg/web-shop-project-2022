import RemoveFromCart from "./RemoveFromCart"

// Function handling listing layout in cart
function CartListing(props){
    const cStyle = {
        display: 'flex',
        width: '400px',
        height: '20px',
        margin: '10px'
    }
    return (
        <div style={cStyle}>
            <Label label={props.title}></Label>
            <PriceTag price={props.price}></PriceTag>
            <RemoveFromCart id={props.id}></RemoveFromCart>
        </div>
        
    )
}

function PriceTag(props){
    const sStyle = {
        width: '200px',
        height: '20px',
    }

    return (<div style={sStyle}>
                {props.price}€
            </div>
    )
}

function Label(props){
    const lStyle = {
        width: '200px',
        height: '20px',
    }
     return <div style={lStyle}>{props.label}</div>
}

export default CartListing;