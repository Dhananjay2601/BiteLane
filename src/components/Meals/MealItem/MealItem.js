import React, { useContext } from "react";
import styles from "../../Styles/MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  // Accessing the cart context
  const cartCtx = useContext(CartContext);

  // Formatting the price to display with two decimal places
  const price = `$${props.price.toFixed(2)}`;

  // Function to handle adding items to the cart
  const addToCartHandler = (amount) => {
    // Adding the item to the cart context
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
