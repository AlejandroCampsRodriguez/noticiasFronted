import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5>Noticias</h5>
            <p className="mb-0">Tu fuente de información actualizada</p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-light me-3 fs-4"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a 
              href="mailto:contacto@ejemplo.com" 
              className="text-light fs-4"
              aria-label="Gmail"
            >
              <i className="bi bi-envelope"></i>
            </a>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <p className="mb-0">&copy; 2026 Noticias. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
