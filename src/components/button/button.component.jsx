import './button.styles.scss';

//below is for providing different styling for different types of buttons, the styling type is passed as buttonType prop
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}


const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button
         className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
         {...otherProps}
         >
           {children}
        </button>
    )
}

export default Button;