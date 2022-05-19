import { createContext, useState, useEffect } from 'react';

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
  itemsTotal: 0,
  totalCartItems: () => {},
  removeCartItem: () => {},
  subtractItemFromCart: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    totalCartItems(cartItems);
    totalPriceSum(cartItems);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subtractItemFromCart = (productToSubtract) => {
    setCartItems(subtractCartItem(cartItems, productToSubtract));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const totalCartItems = (cartItems) => {
    const totalItems = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    setItemsTotal(totalItems);
  };

  const totalPriceSum = (cartItems) => {
    const priceSum = cartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + cartItem.price * cartItem.quantity;
    }, 0);

    setTotalPrice(priceSum);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    itemsTotal,
    removeItemFromCart,
    subtractItemFromCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
