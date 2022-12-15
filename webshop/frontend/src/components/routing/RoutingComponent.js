import Register from '../pages/Register.js';
import Login from '../pages/Login.js';
import Logout from '../pages/Logout.js';
import Myitems from '../pages/Myitems.js';
import './RoutingComponent.css';

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

const RoutingComponent = () =>{
    if (localStorage.getItem("token") !== null) {
        return (
            <div>
                <div>
                    <BrowserRouter>
                        <div className={"menu"} >
                            <NavLink className={"menu-item"} to="/shop/">Home</NavLink>
                            <NavLink className={"menu-item"} to="/shop/myitems">My items</NavLink>
                            <NavLink className={"menu-item"} to="/shop/logout">Logout</NavLink> 
                        </div>
                        <Routes>
                            <Route path="/shop/"/>
                            <Route path="/shop/myitems" element={<Myitems />} />
                            <Route path="/shop/logout" element={<Logout />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    } else return (
        <div>
            <div>
                <BrowserRouter>
                    <div className={"menu"} >
                        <NavLink className={"menu-item"} to="/shop/">Home</NavLink>
                        <NavLink className={"menu-item"} to="/shop/register">Register</NavLink>
                        <NavLink className={"menu-item"} to="/shop/login">Login</NavLink>
                        
                        
                    </div>
                    <Routes>
                        <Route path="/shop/"/>
                        <Route path="/shop/register" element={<Register />} />
                        <Route path="/shop/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
    
}

export default RoutingComponent;