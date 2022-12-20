import {useState} from "react";

// Register input fields
function RegisterInputForm(props){

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');

    function updateUValue(e){
        console.log(e);
        setUser(e.target.value);
    }

    function updatePValue(e){
        console.log(e);
        setPass(e.target.value);
    }
    function updateEValue(e){
        console.log(e);
        setEmail(e.target.value);
    }

    return (
        <div className="Listings">
            <label>
                Email:  <input type='text' value={email} onChange={updateEValue}/>
                Username:  <input type='text' value={user} onChange={updateUValue}/>
                Password:  <input type='password' value={pass} onChange={updatePValue}/>
            </label>
            <button onClick={() => props.Register(user, pass, email)}>{props.text}</button>
        </div>
    )
}

export default RegisterInputForm;