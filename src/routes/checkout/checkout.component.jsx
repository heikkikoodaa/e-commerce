import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, setIsCartOpen, totalPrice } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  return (
    <div className="checkout-container">
      <div className="headers-container">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      <hr />
      {cartItems.map((product) => {
        return <CheckoutItem key={product.id} product={product} />;
      })}
      <span className="total-price">{`Total $${totalPrice}`}</span>
    </div>
  );
};

export default Checkout;
