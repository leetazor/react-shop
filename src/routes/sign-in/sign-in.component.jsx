import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    const logGoogleUser = async () => {
        // below we are de-structuring {user} off the 'response' and passing in to the createUserDocumentFromAut method.
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in page.</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn;