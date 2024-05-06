import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
const Button = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // Access the CartContext using the useContext hook
  const cartCtx = useContext(CartContext);

  // Extract the items array from the cart context
  const { items } = cartCtx;

  // Calculate the total number of items in the cart using the reduce method
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // Dynamically set the button styles to bounce based on btnIsHighlighted state
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  // Set up an effect to trigger when the items array changes
  useEffect(() => {
    // If there are no items in the cart, return early
    if (items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    // Set a timeout to revert btnIsHighlighted to false after 300 milliseconds
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // Cleanup function to clear the timeout when the component unmounts or when the items array changes
    return () => {
      clearTimeout(timer);
    };
  }, [items]); // Dependency array ensures the effect runs when items array changes

  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default Button;
