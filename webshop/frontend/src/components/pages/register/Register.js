import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import RegisterInputForm from './RegisterInputForm';

function Register() {

    const [registered, setRegistered] = useState(false);

    const register = (user, pass, email) => {
        console.log("Registering ", user, pass, email);
        fetch(' http://127.0.0.1:8000/api/signup/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass,
                email: email })
        })
            .then(response => {
                if(!response.ok){
                    throw new Error("http error: " + response.statusCode);
                }
                return response.json()
            })
            .then( data => {
                console.log("data ", data);
                setRegistered(true);
            })
            .catch(response => {
                console.log("Error: ", response.status, response.statusText);
                setRegistered(false);
         })
    }

    if (registered) return <Navigate replace to={"/shop/login"}></Navigate>

    else return (
        <div>
            <RegisterInputForm text={"Register"} Register={register}></RegisterInputForm>
        </div>    
    )
}

export default Register;