import { useDispatch, useSelector } from 'react-redux';

import {
  addItemToCart,
  subtractItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CheckoutItemContainer,
  Quantity,
  QuantityController,
  RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, quantity, price } = product;

  const handleAddItemToCart = () => dispatch(addItemToCart(cartItems, product))
  const handleSubtractItemFromCart = () => dispatch(subtractItemFromCart(cartItems, product))
  const handleRemoveItemFromCart = () => dispatch(removeItemFromCart(cartItems, product))

  return (
    <CheckoutItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <h2>{name}</h2>
      <Quantity>
        <QuantityController
          onClick={handleSubtractItemFromCart}
        >{`<`}</QuantityController>
        <span>{quantity}</span>
        <QuantityController
          onClick={handleAddItemToCart}
        >{`>`}</QuantityController>
      </Quantity>
      <span>{price}</span>
      <RemoveButton onClick={handleRemoveItemFromCart}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
