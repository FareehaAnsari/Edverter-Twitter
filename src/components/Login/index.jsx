import { useEffect, useState } from "react";
import {signInWithEmailAndPassword, 
        GoogleAuthProvider,
        signInWithPopup,
    } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { auth } from "../../firebase";
import classes from "./index.module.css";
//import { Result } from "postcss";
function Login({ loginState }) {
    const provider = new GoogleAuthProvider();//step1
    const navigate = useNavigate();
    const [email, setEmail] = useState("");//first one is for get the value and other one is setting value 
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onGoogleLogin = () => {
      signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user); 
        //"eTECn37K7lTnEMN5eSEuhpTZPRH3" (google)
        //SWeQJYLwNiZpkTh2lijwM8q5lgu1 (signin)
      })
      .catch((error) => {
        console.log(error);
      });

    };

    const onLogin = async (e) => {
       e.preventDefault();
       let errMessage = "";
       const validEmail = email.trim(); 
       //trim func will reduce the spaces before and after the email but it'll ot remove the spaces b/w the email

       if(validEmail.length == 0) {
             errMessage = "Please write your email!";
        }
       else if(password.length == 0) {
        errMessage = "Please write your password"; 
       }
        setErrorMessage(errMessage);
        
       if (!errMessage){
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(res.user.uid);
            navigate('/home');
                 } catch (error) {
                 console.log(error.code);
                 console.log(error.message);
                 if(error.code == "auth/invalid-credential") {
                    console.log("Invalid Credentials");
                 }
            }
        }
       };
/*we're shifting it to parent compoe nt
useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //navigate("/home")
    }else {
    console.log("User is not logged In!")
    }  
    })

}, []);
*/
/*
users{
SWeQJYLwNiZpkTh2lijwM8q5lgu1: {
name: "Fareeha Ansari",
handle: "Ansaridev",
bio: "gshadjhwqjdsiwqueiwqidgejbfdhs"
following; "222",
followers: "12345"
}
}
*/
    return(
        <div className={classes.login}>
        <h1>Login To Your Account</h1>
       
        <p>{errorMessage}</p> 
       
        <form onSubmit = {(e) => {
            onLogin(e)
            }}
             className={classes.login_form}
             >
            <input value={ email } 
            onChange = {(e) => {
                setEmail(e.target.value)
                }}
                 className={classes.input_field}
                 type="email"
                 placeholder="Your email"

            />
            <input
             value={password}
              onChange={(e) => {
                setPassword(e.target.value)
            
            }}
              className={classes.input_field} 
              type="password"
              placeholder="Your password"
                />
            <input
            onClick={onGoogleLogin}
             className={classes.input_google_btn} 
             type="button" 
             value={"Sign in with Google"} 
             />       
            <input className={classes.input_btn} type="submit" value={"Sign in"} />         {/*do makesure in button you have must submit type*/}
        </form>
        <p> 
            Don&apos;t have an account? {" "} 
        <span onClick={loginState} className={classes.login_switch}>
            Register
        </span>
       </p>
    </div>
    );
}

export default Login;