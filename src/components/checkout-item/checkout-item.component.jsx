import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, quantity, price } = product;
  const { removeItemFromCart, addItemToCart, subtractItemFromCart } = useContext(CartContext);

  const handleCartItemRemove = () => removeItemFromCart(product);
  const handleCartItemAdd = () => addItemToCart(product);
  const handleCartItemSubtract = () => subtractItemFromCart(product);

  return (
    <div className="checkout-item">
      <img src={imageUrl} alt={`${name}`} />
      <h2>{name}</h2>
      <div className="quantity-container">
        <span className="quantity-controller subtract" onClick={handleCartItemSubtract}>{`<`}</span>
        <span>{quantity}</span>
        <span className="quantity-controller add" onClick={handleCartItemAdd}>{`>`}</span>
      </div>
      <span>{price}</span>
      <span className="remove-button" onClick={handleCartItemRemove}>
        X
      </span>
    </div>
  );
};

export default CheckoutItem;
