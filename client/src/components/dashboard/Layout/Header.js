//import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { Nav, NavMenu, NavLink } from "../Navbar/NavbarElement";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NavigateNextIcon from "@material-ui/icons/NavigateNext"; // use material UI icon

import HeaderImage from "../../../assets/logo.png";
import fbslider from "../../../assets/fb1.jpg";
import insslider from "../../../assets/ins2.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const slideImages = [fbslider, insslider];

const Header = (props) => {
  // const styles={
  //     cartBtnStyle:{
  //     position:"fixed",
  //     right:"20px",
  //     borderRadius:"32%"
  //     },
  //     cartImgStyle:{
  //         width:"30px",
  //         height:"30px"
  //     },
  //     // elementstyle: {
  //     //     width: "45px"
  //     // }
  // }

  //   return (
  //     <Fragment>
  //       <header className={classes.header}>
  //         <img src={HeaderImage} alt="couldn't load logo" />
  //       </header>
  //       <div className={classes["main-image"]}>
  //         <img src={dashimage} alt="A table full of delicious food!" />
  //       </div>
  //     </Fragment>
  //   );

  return (
    <div>
      <header className={classes.header}>
        <img src={HeaderImage} alt="couldn't load logo" />
        {/* <h1>Foodie Meals</h1> */}
        {/* <HeaderCartButton onClick={props.onShowCart} /> */}

        <div>
          {/* <nav>
            <a class="navigation__li__a" href="/platform">
              Platform
            </a>

            <li class="_plansNavItem navigation__li ">
              <a
                class="navigation__li__a"
                href="/plans"
                data-ga-track-id="nav_main_header_level1_plans"
                itemprop="name"
              >
                Plans
              </a>
            </li>
          </nav> */}

          <Nav>
            <NavMenu>
              <div className={classes.dropdown}>
                <NavLink to="/plateform" activeStyle>
                  plateform
                </NavLink>
                <div className={classes.dropdowncontent}>
                  <p>
                    <NavigateNextIcon />
                    Instagram
                  </p>
                  <p>
                    <NavigateNextIcon />
                    Facebook
                  </p>
                </div>
              </div>

              <NavLink to="/plans" activeStyle>
                plans
              </NavLink>
              <NavLink to="/enterprise" activeStyle>
                enterprise
              </NavLink>
              <NavLink to="/resources" activeStyle>
                resources
              </NavLink>
            </NavMenu>
          </Nav>
        </div>

        <div className={classes.rightbtn}>
          {/* <button className={classes.rightbtn}>
            SignIn <AccountCircle />
          </button>
          <Button
            variant="contained"
            className={classes.rightbtn}
            color="primary"
          >
            SignUP <AccountCircle />
          </Button> */}
          <Link to="/login" className={classes.signinbtn}>
            SignIn
          </Link>
          <Link to="/register" className={classes.signupbtn}>
            SignUp
          </Link>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <div className="slide-container backgroundcover">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            autoPlay={true}
            showThumbs={false}
          >
            {slideImages.map((url, index) => {
              return (
                <div>
                  <img src={url} alt="" />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Header;
