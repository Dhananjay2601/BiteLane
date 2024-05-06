import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducer function to manage cart state based on actions
const cartReducer = (state, action) => {
  // When an item is added to the cart
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //check if that item already exits in cart by finding it using index in that array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //if it exists than pull it out into this obj
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //check if already exits and if YES then,
    if (existingCartItem) {
      //create new obj and copy the existing cart item but also update its amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //create new array and copy the existing items
      updatedItems = [...state.items];
      //in this new array,for that exisitng cart item overwrite its data with updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    //if NOT then,
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // When an item is removed from the cart
  if (action.type === "REMOVE_ITEM") {
    //check if that item already exits in cart by finding it using index in that array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //if it exists than pull it out into this obj
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    //if its the last item in cart ,then it the whole item shud be removed
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    //if its NOT, then just decrease the amount and keep that item in cart
    else {
      //create new obj and copy the existing cart item but also update its amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      //create new array and copy the existing items
      updatedItems = [...state.items];
      //in this new array,for that exisitng cart item overwrite its data with updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // Return the default state if no matching action is found
  return defaultCartState;
};

// CartProvider component to manage cart state and provide context
const CartProvider = (props) => {
  // Use useReducer hook to manage cart state with cartReducer function
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  // Context object with cart state and handler functions
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  // Provide cartContext to its children components using CartContext.Provider
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
