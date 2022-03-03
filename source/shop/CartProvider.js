import React, { createContext, useContext, useReducer } from 'react';

const ACTIONS = {
  ADD: 'add-to-cart',
  REMOVE: 'remove-from-cart',
  CANCEL: 'cancel-item',
  ORDER: 'clearing-cart-screen',
};

const initialState = {
  items: [],
  totalPrice: 0,
};

// MARK: CART REDUCER
const cartReducer = (state, action) => {
  let existingItemIndex;
  let existingItem;
  let updatedItem;
  let updatedItems;
  let updatedTotalPrice;

  switch (action.type) {
    // MARK: ADD PRODUCT
    case ACTIONS.ADD:
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      existingItem = state.items[existingItemIndex];
      updatedTotalPrice =
        state.totalPrice + action.item.price * action.item.quantity;

      if (existingItem) {
        updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.item.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };

    // MARK: DECREASE QTY $ REMOVE PRODUCT
    case ACTIONS.REMOVE:
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      existingItem = state.items[existingItemIndex];
      updatedTotalPrice = state.totalPrice - existingItem.price;

      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };

    // MARK: CANCEL PRODUCT
    case ACTIONS.CANCEL:
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      existingItem = state.items[existingItemIndex];
      updatedTotalPrice =
        state.totalPrice - existingItem.price * existingItem.quantity;
      updatedItems = state.items.filter((product) => product.id !== action.id);
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };

    // FIXME: FOR TESTING 0NLY
    // FIXME: ORDER ITEM (FOR CLEARING CART SCREEN WHEN HIT THE ORDER BUTTON)
    case ACTIONS.ORDER:
      // return to initialState { items: empty Array, totalPrice: 0 }
      return {
        items: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};

// MARK: CART CONTEXT
const CartContext = createContext(initialState);

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItemToCart(item) {
    dispatch({ type: ACTIONS.ADD, item: item });
  }

  function removeItemFromCart(item) {
    dispatch({ type: ACTIONS.REMOVE, id: item.id });
  }

  function cancelProduct(item) {
    dispatch({ type: ACTIONS.CANCEL, id: item.id });
  }

  // FIXME: THIS ORDER FUNCTION IS FOR TESTING ONLY,
  // FIXME: CREATE OTHER REDUCER & CONTEX LOGIC FOR 'ORDER' ACTIONS IN SEPARATED FILE
  function orderItems(items) {
    dispatch({ type: ACTIONS.ORDER, items: items });
  }

  const value = {
    items: state.items,
    totalPrice: state.totalPrice,
    addItemToCart,
    removeItemFromCart,
    cancelProduct,
    orderItems,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
