import { FC, ButtonHTMLAttributes } from 'react';

import './button.styles.scss';
import ButtonSpinner from '../button-spinner/button-spinner.component';

export type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

//below is for providing different styling for different types of buttons, the styling type is passed as buttonType prop
enum BUTTON_TYPE_CLASSES {
    googleSignIn,
    inverted
}


const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
       <button disabled={isLoading}
         className={`button-container ${buttonType}`}
         {...otherProps}
         >
           {isLoading ? <ButtonSpinner/> : children}
        </button>
    )
}

export default Button;