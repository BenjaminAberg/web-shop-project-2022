import {Navigate} from 'react-router-dom';

// Handle logout
function Logout() {

    localStorage.clear();
    window.location.reload(true);

    return <Navigate replace to={"/shop"}></Navigate>
}

export default Logout;