import Register from '../pages/Register.js';
import Login from '../pages/Login.js';
import './RoutingComponent.css';

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

const RoutingComponent = () =>{
    return <div>
            <div>
                <BrowserRouter>
                    <div className={"menu"} >
                        <NavLink className={"menu-item"} to="/shop/register">Register</NavLink>
                        <NavLink className={"menu-item"} to="/shop/login">Login</NavLink>
                    </div>
                    <Routes>
                        <Route path="/shop/register" element={<Register />} />
                        <Route path="/shop/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
}

export default RoutingComponent;