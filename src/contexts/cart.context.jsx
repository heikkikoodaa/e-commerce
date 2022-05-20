import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  // See if cartitems has the product which is going to be added
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });
  // If the product exists already, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return a new array with modified cartItems and make a new item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subtractCartItem = (cartItems, productToSubtract) => {
  // See if cartItems contains the item we need to subtract from
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToSubtract.id;
  });
  // If the product exists, subtract quantity
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToSubtract.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToSubtract.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity && cartItem.quantity - 1,
        }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  // Filter through cartItems returning everything except the product we want to remove
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  totalCartItems: () => {},
  removeCartItem: () => {},
  subtractItemFromCart: () => {},
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartCount, cartTotal, cartItems } = state;

  const updateCartItemsReducer = (newCartItems) => {
    // Generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    // Generate newCartTotal
    const newCartTotal = newCartItems.reduce(
      (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const setIsCartOpen = (newCartState) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, newCartState));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const subtractItemFromCart = (productToSubtract) => {
    const newCartItems = subtractCartItem(cartItems, productToSubtract);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    subtractItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
