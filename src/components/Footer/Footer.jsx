import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="">
      <Container>
        <Row>
          <Col md={4}>
            <h5>TrendBazz</h5>
            <p>Your go-to store for tech, fashion, home & more.</p>
          </Col>

          <Col md={4}>
            <h5>Contact</h5>
            <p>123 TrendBazz Street, Tech City, FL 12345</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: support@trendbazz.com</p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <p className="text-center">&copy; {new Date().getFullYear()} TrendBazz. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;