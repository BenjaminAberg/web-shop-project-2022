import Register from '../pages/register/Register.js';
import Login from '../pages/login/Login.js';
import Logout from '../pages/login/Logout.js';
import Search from '../pages/search/Search.js';
import Myitems from '../pages/myitems/Myitems.js';
import Cart from '../pages/cart/Cart.js';
import './RoutingComponent.css';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

// Handle top menu bar
const RoutingComponent = () =>{

    if (localStorage.getItem("token") !== null) {
        return (
            <div>
                <div>
                    <BrowserRouter>
                        <div className={"App"} >
                            <NavLink className={"menu-item"} to="/shop">Home</NavLink>
                            <NavLink className={"menu-item"} to="/myitems">My items</NavLink>
                            <NavLink className={"menu-item"} to="/logout">Logout</NavLink>
                            <NavLink className={"menu-item-right"} to="/search">Search</NavLink>
                            <NavLink className={"menu-item-right"} to="/cart" >View cart</NavLink>
                        </div>
                        <Routes>
                            <Route path="/shop"/>
                            <Route path="/myitems" element={<Myitems />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    } else return (
        <div>
            <div>
                <BrowserRouter>
                    <div className={"App"} >
                        <NavLink className={"menu-item"} to="/shop">Home</NavLink>
                        <NavLink className={"menu-item"} to="/signup">Register</NavLink>
                        <NavLink className={"menu-item"} to="/login">Login</NavLink>
                        <NavLink className={"menu-item-right"} to="/search">Search</NavLink>
                    </div>
                    <div>

                    </div>
                    <Routes>
                        <Route path="/shop"/>
                        <Route path="/signup" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
    
}

export default RoutingComponent;