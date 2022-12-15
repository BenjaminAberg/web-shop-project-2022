
function Listing(props){
    const cStyle = {
        width: '270px',
        height: '270px',
        margin: '15px',
        border: 'solid 1px grey'
    }

    return (
        <div style={cStyle}>
            <Square description = {props.description}></Square>
            <Label label = {props.title}></Label>
        </div>
    )
}

function Square(props){
    const sStyle = {
        width: '270px',
        height: '230px',
        backgroundColor: '#ebf0ec'
    }

    return <div style={sStyle}>{props.description}</div>
}

function Label(props){
    const lStyle = {
        width: '270px',
        height: '60px',
    }
     return <div style={lStyle}><h3>{props.label}</h3></div>
}

export default Listing;