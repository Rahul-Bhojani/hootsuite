//import { Fragment } from "react";

import Summary from "./Summary";
import classes from "./HootsuiteSummary.module.css";
import { Container, Row, Col } from "reactstrap";

import layoutimg1 from "../../../assets/Layout-1.png";
import layoutimg2 from "../../../assets/Layout-2.png";
import layoutimg3 from "../../../assets/Layout-3.png";
import layoutimg4 from "../../../assets/Layout-4.png";

const HootsuiteSummary = () => {
  return (
    <div className={classes.maindiv}>
      <Summary />
      <Container>
        <Row>
          <Col xs="6">
            <img src={layoutimg1} alt=""></img>
          </Col>

          <Col xs="6">
            <Container>
              <div
                style={{
                  marginTop: "135px",
                  textAlign: "left",
                }}
              >
                <h2>Do more on social in less time</h2>
                <p>
                  Save time by scheduling posts across all your social networks
                  in just a few clicks. Automatically schedule your content and
                  review posts in a simple calendar view.
                </p>
                <p>
                  "I am saving so much time by being able to schedule my posts
                  in one place for different social media platforms"
                </p>
              </div>
            </Container>
          </Col>

          <Col xs="6">
            <Container>
              <div style={{ marginTop: "135px", textAlign: "left" }}>
                <h2>Grow your social following the right way</h2>
                <p>
                  Produce quality content that delights your audience and
                  reaches more people. Access your image assets directly from
                  the Hootsuite dashboard to make regular posting easy.
                </p>
                <p>
                  "It makes it easy to visualize when everything is scheduled to
                  go out and where the gaps in content may be"
                </p>
              </div>
            </Container>
          </Col>

          <Col xs="6">
            <img src={layoutimg2} alt=""></img>
          </Col>

          <Col xs="6">
            <img src={layoutimg3} alt=""></img>
          </Col>

          <Col xs="6">
            <Container>
              <div
                style={{
                  marginTop: "130px",
                  textAlign: "left",
                }}
              >
                <h2>Find out what your customers really think</h2>
                <p>
                  Keep an eye on the latest social conversations, trends, and
                  brand mentions. Quickly respond to comments from an inbox that
                  combines all your conversations from supported social networks
                  in a single thread.
                </p>
                <p>
                  "I feel so connected with my audience since I have implemented
                  this tool"
                </p>
              </div>
            </Container>
          </Col>

          <Col xs="6">
            <Container>
              <div style={{ marginTop: "120px", textAlign: "left" }}>
                <h2>See what’s working. Do more of it</h2>
                <p>
                  Invest in content that grows your business. Our social
                  analytics dashboard shows your top performing content and
                  gives personalized insights on why it’s working.
                </p>
                <p>
                  "You can see all the data for each post in one simple
                  dashboard, which helps you create better content in the
                  future"
                </p>
              </div>
            </Container>
          </Col>

          <Col xs="6">
            <img src={layoutimg4} alt=""></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HootsuiteSummary;
