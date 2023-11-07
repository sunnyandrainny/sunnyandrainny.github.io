import '../view/Nav.scss'
import { NavLink } from 'react-router-dom';
const Nav = () => {
    return(
        <div className="topnav">
            <NavLink activeClassName="active" to="/" exact>Home</NavLink>
            <NavLink activeClassName="active" to="/timer">Timer Apps</NavLink>
            <NavLink activeClassName="active" to="/todo">To do Apps</NavLink>
            <NavLink activeClassName="active" to="/blog">Blog Apps</NavLink>
            <NavLink activeClassName="active" to="/about">About</NavLink>
        </div>
    )
}
export default Nav;