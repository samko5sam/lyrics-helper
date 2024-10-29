import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          {/* Links Section */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Home</a></li>
              <li><a href="/about" className="text-dark">About</a></li>
              <li><a href="/contact" className="text-dark">Contact</a></li>
              <li><a href="/lyrics" className="text-dark">Lyrics</a></li>
            </ul>
          </Col>

          {/* Social Media Section */}
          <Col md={4}>
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" rel='noopener nofollow' className="text-dark me-3">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" rel='noopener nofollow' className="text-dark me-3">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" rel='noopener nofollow' className="text-dark">
                <FaInstagram />
              </a>
            </div>
          </Col>

          {/* Copyright Section */}
          <Col md={4} className="text-md-end">
            {/* <h5>{new Date().getFullYear()} En Lyrics Helper</h5> */}
            {/* <p>&copy; All rights reserved.</p> */}
            <p>En Lyrics Helper</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;