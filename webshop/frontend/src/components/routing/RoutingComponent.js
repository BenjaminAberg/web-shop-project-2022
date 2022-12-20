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
                            <NavLink className={"menu-item"} to="/shop/myitems">My items</NavLink>
                            <NavLink className={"menu-item"} to="/shop/logout">Logout</NavLink>
                            <NavLink className={"menu-item-right"} to="/shop/search">Go to search</NavLink>
                            <NavLink className={"menu-item-right"} to="/shop/cart" >View cart</NavLink>
                        </div>
                        <Routes>
                            <Route path="/shop"/>
                            <Route path="/shop/myitems" element={<Myitems />} />
                            <Route path="/shop/logout" element={<Logout />} />
                            <Route path="/shop/search" element={<Search />} />
                            <Route path="/shop/cart" element={<Cart />} />
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
                        <NavLink className={"menu-item"} to="/shop/signup">Register</NavLink>
                        <NavLink className={"menu-item"} to="/shop/login">Login</NavLink>
                        <NavLink className={"menu-item-right"} to="/shop/search">Go to search</NavLink>
                    </div>
                    <div>

                    </div>
                    <Routes>
                        <Route path="/shop"/>
                        <Route path="/shop/signup" element={<Register />} />
                        <Route path="/shop/login" element={<Login />} />
                        <Route path="/shop/search" element={<Search />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
    
}

export default RoutingComponent;