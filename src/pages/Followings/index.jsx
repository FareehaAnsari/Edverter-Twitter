import Nav from "../../components/Nav";
import classes from "./index.module.css";
function Followings() {
    const followings = [
        {
            name: "John Doe",
            handle: "@johndoe",
        },
        {
            name: "Jonny",
            handle: "@jonny",
        },
        {
            name: " Dave",
            handle: "@dave",
        },
        {
            name: "Tom",
            handle: "@tom",
        },
    ];

    return(
        <>
        <Nav />
          <div className={classes.container}>
             <h2>Followings</h2>
             {
                followings.map((following, index) => {
                    return(    //error
                        <div key={index} className={classes.following}>
                            <h3>{following.name}</h3>
                            <p>{following.handle}</p>
                      </div>
                    );
                })}
        </div>
        </>
    )



}
export default Followings;