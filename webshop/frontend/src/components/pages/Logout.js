import {Navigate} from 'react-router-dom';

function Logout() {

    localStorage.clear();

    return <Navigate replace to={"/shop"}></Navigate>
}

export default Logout;