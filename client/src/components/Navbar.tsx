import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1> Ameetee Autoparts</h1>
            </div>

            <div className="nabvbar-links">
            <Link to="/"> Shop </Link> 
            <Link to="/purchased-items"> purchases </Link> 
            <Link to="/checkout"> 
                <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <Link to="/"> Shop </Link> 
            </div>
             </div>
    );
} ;






