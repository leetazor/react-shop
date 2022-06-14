
import { useDispatch } from 'react-redux';

import { clearItemFromCart } from '../../store/cart/cart.action';
import { addItemToCart } from '../../store/cart/cart.action';
import { removeItemFromCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
  const dispatch = useDispatch();  
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <div className="checkout-item-container">
       <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
       </div>
       <span className="name">{name}</span>
       <span className="quantity">
          <div className="arrow" onClick={removeItemHandler}>
            &#10094;
          </div>
        <span className="value">{quantity}</span>
         <div className="arrow" onClick={addItemHandler}>
            &#10095;
         </div>
         </span>
       <span className="price">{price}</span>
       <div className="remove-button" onClick={clearItemHandler}>&#10006;</div>
    </div>
  )
}

export default CheckoutItem;