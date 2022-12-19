import {Navigate} from 'react-router-dom';

function Logout() {

    localStorage.clear();
    window.location.reload(true);

    return <Navigate replace to={"/shop"}></Navigate>
}

export default Logout;