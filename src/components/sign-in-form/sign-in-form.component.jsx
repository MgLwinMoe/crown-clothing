import { useState } from "react";
import FormInput from "../formInput/form-input";
import './sign-in-form-style.scss'
import Button from "../button/button-component";
import { signInWithGooglePopup, createUserDocumentFromAuth , SignInUserWithEmailAndPassword} from "../../utils/firebase-utils"
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const onResetField = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
            const response = SignInUserWithEmailAndPassword(email, password);
            console.log(response);
            onResetField();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrond-password':
                    alert('Wrong password')
                    break;
                case 'auth/user-not-found':
                    alert('no user found associated with email')
                default:
                    console.log(error);
            }
        }
    }
    const handleChange = (event) => {
        const{ name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoolge = async () => {
        const {user} = await signInWithGooglePopup();
        const userCreateDoc= await createUserDocumentFromAuth(user);
      };
    return (
        <div className="sign-in-container">
            <form onSubmit={ handleSubmit}>

                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password"  type="password" required onChange={handleChange} name="password" value={password}/>
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoolge}>Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;