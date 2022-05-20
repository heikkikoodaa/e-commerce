import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  Quantity,
  QuantityController,
  RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, quantity, price } = product;
  const { removeItemFromCart, addItemToCart, subtractItemFromCart } =
    useContext(CartContext);

  const handleCartItemRemove = () => removeItemFromCart(product);
  const handleCartItemAdd = () => addItemToCart(product);
  const handleCartItemSubtract = () => subtractItemFromCart(product);

  return (
    <CheckoutItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <h2>{name}</h2>
      <Quantity>
        <QuantityController
          onClick={handleCartItemSubtract}
        >{`<`}</QuantityController>
        <span>{quantity}</span>
        <QuantityController
          onClick={handleCartItemAdd}
        >{`>`}</QuantityController>
      </Quantity>
      <span>{price}</span>
      <RemoveButton onClick={handleCartItemRemove}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
