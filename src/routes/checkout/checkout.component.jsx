import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, Headers, TotalPrice } from './checkout.styles';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <CheckoutContainer>
      <Headers>
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </Headers>
      <hr />
      {cartItems.map((product) => {
        return <CheckoutItem key={product.id} product={product} />;
      })}
      <TotalPrice>{`Total $${cartTotal}`}</TotalPrice>
    </CheckoutContainer>
  );
};

export default Checkout;
