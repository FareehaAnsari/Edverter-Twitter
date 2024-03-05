import { Link } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "..//../firebase";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.css";
function Navigation() {
    const navigate = useNavigate();
    const navLinks = [
    {
        placeholder: "Home",
        path: "/home",
        isLink: true,  
    },
    {
        placeholder: "Followers",
        path: "/home/followers",
        isLink: true,  
    },
    {
        placeholder: "Followings",
        path: "/home/followings",
        isLink: true,  
    },
    {
        placeholder: "Setting",
        path: "/setting",
        isLink: true,  
    },
    {
        placeholder: "Sign out",
        path: "/",
        isLink: false,  
    },
    ];
// we've to do this process for promises, no need of async
    const logoutHandler = () => {
        signOut(auth)
        .then(() =>{
            console.log("signed out successfully");
            //navigate("/");//promise function + process of signout
        })
        .catch(err => {
            console.log(err);
        });
        };
    return(
        <nav>
        <h3 className="text-xl uppercase font-bold">Edverter</h3>
        <ul className={classes.list_items }>
        {
            navLinks.map((navlink, index) => (
               <li className={classes.list_item} key={index}>
                 {
                    navlink.isLink ? (
                 <Link to={navlink.path}>{navlink.placeholder}</Link>
                    ) : (
                    <button onClick={logoutHandler}>Signout</button>
                    )
                 }
               </li> 
            ))
        }
        </ul>
        </nav>
    );
}
export default Navigation;