import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { connect } from "react-redux";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { NOT_CONTAINS_NULL_VALUES } from "../../utils";

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                CONTACT
            </Link>
            {console.log("user : ", currentUser)}
            {console.log("cart : ", hidden)}
            {NOT_CONTAINS_NULL_VALUES(currentUser["currentUser"]) ? (
                <div
                    className="option"
                    onClick={() => {
                        auth.signOut();
                    }}
                >
                    Sign Out
                </div>
            ) : (
                <Link className="option" to="/signin">
                    Sign In
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden.hidden ? null : <CartDropDown />}
    </div>
);

const mapStateToProps = ({ user: currentUser, cart: hidden }) => ({
    currentUser,
    hidden,
});

export default connect(mapStateToProps)(Header);
