import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51I3HU2CLpRkLZdhesSkKhTcyy5N6OsllAEOiS0RfVfkzzzMHsoIzZ1dITNIw35TQXaaUZGJgiUmR70Eu9DREWUhY00JUYJBMmW";

    const onToken = (token) => {
        console.log(token);
        alert("Payment Successfull");
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            locale="en"
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
