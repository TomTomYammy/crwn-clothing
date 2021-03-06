import "./App.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./component/header/header.component";
import CheckoutPage from "./component/checkout/checkout.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { NOT_CONTAINS_NULL_VALUES } from "./utils";

class App extends React.Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        console.log("Call componentDidMount");
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = createUserProfileDocument(userAuth);
                (await userRef).onSnapshot((snapShot) => {
                    setCurrentUser({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data(),
                        },
                    });
                });
            } else {
                setCurrentUser({ currentUser: userAuth });
            }
        });
    }

    componentWillUnmount() {
        console.log("call componentWillUnmount");
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signIn"
                        render={() =>
                            this.props.currentUser &&
                            NOT_CONTAINS_NULL_VALUES(
                                this.props.currentUser["currentUser"]
                            ) ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
