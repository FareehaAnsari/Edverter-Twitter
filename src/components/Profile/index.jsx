import { useState, useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import classes from "./index.module.css";
function Profile({ isUserOnHome, info }) {
    console.log(info);
    const [userInfo, setUserInfo] = useState({
       name: "",
       photo: "",
       followers: 0,
       followings: 0,
       bio : "",
    });
    {/*}
        const db = getDatabase();
        // Get a reference to the database service
        const followingRef = ref(db, "users/" + userID + "/followings");
        const followerRef = ref(db, "users/" + userID + "/follower");
  }
*/}
    useEffect(() => {
        if (info) {
            if (!info.followers) {
              info.followers = {};
            }
            if (!info.followings) {
              info.followings = {};
            }
            setUserInfo(info);
          }
        }, [info]);

        const followHandler = () => {
          alert("Followed!");
             {/*const db = getDatabase();
             const followingRef = ref(db, `users/${userID}/followings`);
             const followerRef = ref(db, `users/${userID}/followings`);
             const newFollowingRef = push(followingRef);
             const newFollowerRef = push(followerRef);
             set(newFollowingRef, {
                userID,
             });
             set(newFollowerRef, {
                userID,
             });
             }
             */}
          }
        return(
        <div className={classes.profile}>
             <div className={classes.profile_cover}></div>
             <div className={classes.profile_basics}>
            <img
            src ={userInfo.photo}
            className={classes.profile_basics_img}
             />
            <div>
           <h2 className="text-3xl font-semibold mt-5">{userInfo.name}</h2>
             <p className={classes.profile_basics_handler}>@Ansaridev</p>
            </div>
            <button 
            onClick={followHandler} 
            className={classes.follow_btn}>Follow</button>
            </div>
             <div className={classes.profile_bio}>
             {userInfo.bio}
             </div>
             <div className={classes.profile_stats}>
               <div>
                  <h3>Following</h3>
                  <p>{Object.keys(userInfo.followings).length}</p>
               </div>
               <div>
                  <h3>Followers</h3>
                  <p>{Object.keys(userInfo.followers).length}</p>
               </div>
               </div> 
        </div>
    )
}
export default Profile;