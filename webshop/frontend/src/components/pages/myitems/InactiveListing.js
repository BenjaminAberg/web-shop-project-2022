
function InactiveListing(props){
    const cStyle = {
        width: '270px',
        height: '290px',
        margin: '15px',
        border: 'solid 1px grey'
    }
    return (
        <div style={cStyle}>
            <Label label={props.title}></Label>
            <Square id={props.id} description={props.description} price={props.price} created_at={props.created_at}></Square>
        </div>
    )
}

function Square(props){
    const sStyle = {
        width: '270px',
        height: '240px',
        backgroundColor: '#ebf0ec'
    }

    return (<div style={sStyle}>
        <b>Description:&nbsp;</b><i>{props.description}</i><br></br>
        <b>Price:&nbsp;</b><i>{props.price}€</i><br></br>
        <b>Created at:&nbsp;</b><i>{props.created_at}</i><br></br>
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

export default InactiveListing;