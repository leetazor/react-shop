import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input-component';
import Button from '../button/button.component';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''    
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields; 
     
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }   

    const signInWithGoogle = async () => {
        //const response = await signInWithGooglePopup();
        //console.log(response);

        // below we are de-structuring {user} off the 'response' and passing in to the createUserDocumentFromAut method.
        dispatch(googleSignInStart());    
    }  

    const handleSubmit = async (event) => {
    event.preventDefault();    
     
        //attempt to Create an authentication with Firebase, to obtain uid (firebase/auth automatically creates it for us)

        try {
          dispatch(emailSignInStart(email, password));
          //re-setting the form fields 
          resetFormFields();
          
        } catch(error) { 
            switch(error.code) {
              case 'auth/wrong-password':
                alert('password is incorrect');  
                break;
              case 'auth/user-not-found':
                alert('username does not exist');
                break;
              default:
                console.log('error authenticating the user', error); 
            }                                     
        }
    };

    const handleChange = (event) => {
    const {name, value} = event.target;
      //below we are spreading all of the form fields and only updating the value of the field with the same name as event.target.name      
      setFormFields({...formFields, [name]: value});      
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit ={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle} >Google sign In</Button>
                </div>
                             
            </form>
        </div>
    )
}

export default SignInForm;