import classes from "./Footer.module.css";
// import HeaderImage from "../../assets/logo.png";

const footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footerlogo}>
        {/* <img src={HeaderImage} /> */}
      </div>
      <div classname={classes.sub}>
        <div className={classes.subfooter}>
          <ul>
            <h6>
              <b>Platform</b>
            </h6>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Features</li>
          </ul>
        </div>
      </div>

      <div classname={classes.sub}>
        <div className={classes.subfooter}>
          <ul>
            <h6>
              <b>Plan</b>
            </h6>
            <li>Free</li>
            <li>Professional</li>
            <li>Team</li>
          </ul>
        </div>
      </div>

      <div classname={classes.sub}>
        <div className={classes.subfooter}>
          <ul>
            <h6>
              <b>Enterprise</b>
            </h6>
            <li>Solutions</li>
            <li>Industries</li>
            <li> Business</li>
          </ul>
        </div>
      </div>

      <div classname={classes.sub}>
        <div className={classes.subfooter}>
          <ul>
            <h6>
              <b>Educations</b>
            </h6>
            <li>Acadmy</li>
            <li>Resource</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>    

      <div classname={classes.sub}>
        <div className={classes.subfooter}>
          <ul>
            <h6>
              <b>About</b>
            </h6>
            <li>About us</li>
            <li>contact</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default footer;
