import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../Loader";
import {auth} from "../../firebase";
import classes from "./index.module.css";
import { getDatabase, ref, set } from "firebase/database";

function Register({registerState, setIsInMiddleOfRegistration}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const submitHandler = async (e) => {
      setIsInMiddleOfRegistration(true);
      setLoading(true);
        e.preventDefault();

        const updatedErrorMessages = [];

        if(!email.trim()) {
          updatedErrorMessages.push("Please enter a valid email address.");
    } 
       if (!name.trim()) {
          updatedErrorMessages.push("Please enter a valid name.");
    } 
      if (!password) {
          updatedErrorMessages.push("Please enter a password.");
    
        } 
      if (!confirmPassword){
            updatedErrorMessages.push("Please enter a confirmation password.");
        } 

        if (password !== confirmPassword){
            updatedErrorMessages.push("Password didn't match");
        }
        setErrorMessages(updatedErrorMessages);

        //if (updatedErrorMessages.length > 0) {
       // } it'll show an empty brackets if theres no error find

       if(updatedErrorMessages.length == 0){
       try {
        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          password
          );
          const imagesDirectory = [
            "https://images.pexels.com/photos/1066116/pexels-photo-1066116.jpeg",
            "https://images.pexels.com/photos/1072036/pexels-photo-1072036.jpeg",
            "https://images.pexels.com/photos/6474325/pexels-photo-6474325.jpeg",
          ];
               //save the data to Database
         const db = getDatabase();
         set(ref(db, "users/" + res.user.uid), {
          name: name,
          photo : 
          imagesDirectory[Math.floor(Math.random() * imagesDirectory.length)],
          bio :"A random user from a radom place",
          followers : {},
          followings : {},
          tweets: {
            "adkdjfivfbjsadjdj" : {
             title: "",
             description: "", 
             date : "",
             likes: 0,
            }
          },

         }); 
         //1st one is the referece 2nd is the value 
         //alert("User Authenticated!");
         // console.log(db);
         // response.user.uid
         //console.log("Registered user" , response.user.id);
         setIsInMiddleOfRegistration(false);
         setLoading(false);
        }
       catch(error){
         console.log(error);
         setIsInMiddleOfRegistration(false);
         setLoading(false);
       }
      }
    };
    return(
        <div className={classes.login}>
        {isLoading ? (
          <Loader /> 
          ) : (
         <>
         <h1>Register Your Account</h1>
      {errorMessages.map((errorMessage, index) => (
         <p key={index} className={classes.error}>
         {errorMessage}
        </p>
      ))}

        <form 
        onSubmit ={(e) => submitHandler(e)}
         className={classes.login_form}>
        <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className= {classes.input_field}
             type="email" 
             placeholder="Your Email"
        />

            <input 
             value={name}
             onChange={(e) => setName(e.target.value)}
             className={classes.input_field} 
            type="name" 
             placeholder="Enter your Name"
             />

            <input 
             value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input_field}
             type="password" 
             placeholder="Enter Your Password"
             />
            <input  
            value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
             className={classes.input_field}
             type="password"
              placeholder="Confirm password"
              />
            <input className={classes.input_btn}
             type="submit"
              value={"Register"} 
              />
        </form>
        <p>Already have an account,{"  "}
           <span 
           onClick={registerState} className={classes.login_switch}>
            Login
            </span>
            </p>
            </>
          )}
        </div>
    )
}


export default Register;