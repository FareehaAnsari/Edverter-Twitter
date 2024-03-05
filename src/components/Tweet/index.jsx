import classes from "./index.module.css";
function Tweet({ item }) {
    const {title, description, date, likes} = item;
    return(
    <div className={classes.tweet}>
        <h2 className="text-xl font-bold mb-5 mt-2 px-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className={["w-full mb-2" , classes.divider].join(" ")}></div>

        <div className={classes.tweet_stats}>
        <p className={classes.tweet_date}>
       {`${new Date().getDate()}
        -${new Date().getMonth()}
        -${new Date().getFullYear()} 
         ${new Date().getHours()}:
         ${new Date().getMinutes()}`}
         </p>
        <p className={classes.tweet_like}>
            {likes}likes</p>
        </div>
       
    </div>
        );
}
export default Tweet;