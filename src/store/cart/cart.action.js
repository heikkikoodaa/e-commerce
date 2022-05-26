import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const subtractItemFromCart = (cartItems, productToSubtract) => {
  const newCartItems = subtractCartItem(cartItems, productToSubtract);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
