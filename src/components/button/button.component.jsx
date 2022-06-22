import './button.styles.scss';

import ButtonSpinner from '../button-spinner/button-spinner.component';

//below is for providing different styling for different types of buttons, the styling type is passed as buttonType prop
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    invertedPayment: 'inverted payment'
}


const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
       <button disabled={isLoading}
         className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
         {...otherProps}
         >
           {isLoading ? <ButtonSpinner/> : children}
        </button>
    )
}

export default Button;