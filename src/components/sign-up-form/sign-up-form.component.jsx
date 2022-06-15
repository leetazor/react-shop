import {useState} from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input-component';
import Button from '../button/button.component';

import { emailSignUpStart } from '../../store/user/user.action';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword } = formFields; 
 
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }   

    const handleSubmit = async (event) => {
    event.preventDefault();    
        ///check password === confirmPassword

        if(password !== confirmPassword ) {
            console.log("passwords do not match");
            return;
        }
        //attempt to Create an authentication with Firebase, to obtain uid (firebase/auth automatically creates it for us)

        try {
          dispatch(emailSignUpStart(email, password, displayName));
          //re-setting the form fields 
          resetFormFields();
          
        } catch(error) {
            //leveraging firebase functionality 'user email already exists' preventing creation of an account if the email exists
            if(error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('error creating the user', error);
            };           
        }


    };

    const handleChange = (event) => {
    const {name, value} = event.target;
      //below we are spreading all of the form fields and only updating the value of the field with the same name as event.target.name      
      setFormFields({...formFields, [name]: value});      
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit ={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;