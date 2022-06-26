import './form-input.styles.scss';

import { FC, InputHTMLAttributes } from 'react';


export type FormInputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {

    return (
        <div className="group">
            <input className="form-input" { ...otherProps } />
            {/* Below short-cicuit reads like: if lable exists, then render label */}
            {label && (
                // here we are making sure that the below 'check' for the otherProps.value.length is a Boolean and
                // that otherProps.value exists and it is a string.
               <label className={`${Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length > 0 ? 'shrink' : '')} form-input-label`}> {label} </label>
            )}            
            
        </div>
    )
}

export default FormInput;