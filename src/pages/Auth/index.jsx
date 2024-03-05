import { useState, useEffect } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase'; //local firebase
import { useNavigate } from 'react-router-dom';
import classes from "./index.module.css";
function Auth() { 
    const navigate = useNavigate();
    const [isAuth, setAuth] = useState(false); //setting by default
    const [isRegister, setIsRegister] = useState(true);


    const switchState = () => {
        const currentRegisterState = !isRegister;
        setIsRegister(currentRegisterState);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
              navigate("/home")
         } else {
        console.log("User is not logged In!")
        setAuth(false);
        }  
        })
    
    }, []);
    return(
        <>
        { true && (
             <div className={classes.container}>
            {isRegister == true ? (
            <Login  loginState={switchState}/> 
            ): (
            <Register registerState={switchState}/>
           )};
        </div> 
        )}
        </>
    );
}

export default Auth;