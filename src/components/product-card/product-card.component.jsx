
import { useSelector } from 'react-redux';
import Button from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl} = product;



    const addProductToCart = () => addItemToCart(product);
    
    return(
    <div className="product-card-container">
        <img src={ imageUrl } alt={`${name}`} />
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button type="inverted" onClick={addProductToCart}>Add to card</Button>
    </div>
    );

}

export default ProductCard;