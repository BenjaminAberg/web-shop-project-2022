import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import LoginInputForm from './LoginInputForm';

// Handle login functionality
function Login() {

    const [logged_in, setLogged_in] = useState(false);

    const login = (user, pass) => {
        console.log("Logging in ", user, pass);
        fetch(' http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass,
            })
        })
            .then(response => {
                 if(!response.ok){
                    throw new Error("http error: " + response.statusCode)
                }
                return response.json()
            })
            .then( data => {
                console.log("data ", data);
                localStorage.setItem("token", data.token)
                setLogged_in(true);
            })
            .catch(err => {
                console.log("Error: ", err);
                setLogged_in(false);
            })
    }

    if (logged_in) {
        window.location.reload(true);
        return <Navigate replace to={"/shop"}></Navigate>
    }
    
    else return (
        <div>
            <LoginInputForm text={"Login"} Login={login}></LoginInputForm>
        </div>  
    )
}

export default Login;