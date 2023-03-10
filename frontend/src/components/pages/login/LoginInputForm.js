import {useState} from "react";

// Login fields
function LoginInputForm(props){

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    function updateUValue(e){
        console.log(e);
        setUser(e.target.value);
    }

    function updatePValue(e){
        console.log(e);
        setPass(e.target.value);
    }


    return (
        <div className="Listings">
            <label>
                Username:  <input type='text' value={user} onChange={updateUValue}/>&nbsp;&nbsp;
                Password:  <input type='password' value={pass} onChange={updatePValue}/>
            </label>
            &nbsp;
            &nbsp;
            &nbsp;
            <button onClick={() => props.Login(user, pass)}>{props.text}</button>
        </div>
    )
}

export default LoginInputForm;