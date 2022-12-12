

function Listing(props){
    const cStyle = {
        width: '100px',
        height: '200px',
        margin: '10px',
        border: 'solid 1px black'
    }


    return (
        <div style={cStyle} onClick={() => props.addHandler(props.color)}>
            <Square scolor={props.color}></Square>
            <Label lcolor={props.color}></Label>
        </div>
    )
}

function Square(props){
    const sStyle = {
        width: '100px',
        height: '150px',
        backgroundColor: ''
    }
    sStyle.backgroundColor = props.scolor;

    return <div style={sStyle}></div>
}

function Label(props){
    const lStyle = {
        width: '100px',
        height: '50px'
    }
     return <div style={lStyle}>
         {props.lcolor}
     </div>
}

export default Listing;