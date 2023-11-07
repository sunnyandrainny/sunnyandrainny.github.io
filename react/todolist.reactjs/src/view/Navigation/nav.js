import React from "react";
import './nav.css'
import {
    Link, NavLink
  } from "react-router-dom";
class Nav extends React.Component{
    render(){
        return(
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/todos">Todos</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/user">User</NavLink>
            </div>
        )
    }
}
export default Nav;