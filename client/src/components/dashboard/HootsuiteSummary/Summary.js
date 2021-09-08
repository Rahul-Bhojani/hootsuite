import classes from "./Summary.module.css";

// import instaicon from "../../assets/instaicon.png";
// import fbicon from "../../assets/fbicon.png";
// import { Button } from "@material-ui/core";

const Summary = () => {
  return (
    <section className={classes.summary}>
      <h2>Manage all your social media in one place</h2>
      <p>Grow your social media presence more efficiently</p>
      <p style={{ lineHeight: "200%" }}>
        Easily find and share compelling and posting social content to attract
        new followers and boost your traffic.
      </p>
      {/* <p>
        <div className={classes.instaicon}>
          <img src={instaicon} alt="oops! couldn't be load instagram-icon" />
          <h2>𝓲𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</h2>
        </div>

        <div className={classes.fbicon}>
          <img src={fbicon} alt="oops! couldn't be load facebook- icon" />
          <Button>𝓯𝓪𝓬𝓮𝓫𝓸𝓸𝓴</Button>
        </div>
      </p> */}
    </section>
  );
};

export default Summary;
