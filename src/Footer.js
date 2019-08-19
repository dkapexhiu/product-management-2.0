import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import './Footer.css';

class FooterPage extends React.Component {
render() {
return (
<Footer className="font-small pt-4 mt-4 footer" style={{backgroundColor:'#2fb4fd', color:'white', marginTop:'0'}}>
  <Container fluid className="text-center text-md-center">
    <Row>
      <Col md="12" sm="12">
      <h5 className="title">Product Management</h5>
      <p>
        The best way for organizing your stuff!
      </p>
      </Col>
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3" style={{color:'white'}}>
    <Container fluid>
      &copy; {new Date().getFullYear()} Copyright{" "}
      <a href="https://dkapexhiu.github.io"> Daniel Kapexhiu </a>
    </Container>
  </div>
</Footer>
);
}
}

export default FooterPage;