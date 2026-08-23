import React from 'react';
import { Card, Button, Badge, Container, Row, Col } from 'react-bootstrap';

function SearchResults({ aiSummary, results }) {
  if ((!results || results.length === 0) && !aiSummary) {
    return (
      <div className="text-center my-5 py-5 animate__animated animate__fadeIn">
        <div className="mb-4">
          <i className="bi bi-search-heart fs-1 text-primary opacity-50"></i>
        </div>
        <h4 className="text-light fw-light">Sin coincidencias</h4>
        <p className="text-muted">Intenta con otros términos o categorías.</p>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 px-md-5 py-4">
      {aiSummary && (
        <div className="mb-5 p-4 rounded-4" style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
          border: '1px solid rgba(139,92,246,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
              <i className="bi bi-cpu fs-4 text-primary"></i>
            </div>
            <div>
              <h5 className="fw-bold text-white mb-0">Resumen IA</h5>
              <small className="text-muted">Generado con Gemini Flash</small>
            </div>
          </div>
          <p className="text-white mb-0 lh-lg" style={{ fontSize: '0.95rem' }}>
            {aiSummary}
          </p>
        </div>
      )}

      {results && results.length > 0 && (
        <>
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
            <div>
              <h6 className="fw-bold text-white mb-0">Artículos relevantes</h6>
              <small className="text-muted">{results.length} resultados</small>
            </div>
          </div>

          <Row className="g-4">
            {results.map((item) => (
              <Col xs={12} sm={6} lg={4} xl={3} key={item.id}>
                <Card
                  className="h-100 search-card border-0 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(30, 30, 30,0.85)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="position-relative overflow-hidden rounded-top-4">
                    <Card.Img
                      variant="top"
                      src={item.thumbnail || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=600`}
                      alt={item.title}
                      style={{
                        height: '180px',
                        objectFit: 'cover',
                        filter: 'brightness(0.9)'
                      }}
                    />
                    <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0">
                      <i className="bi bi-plus-circle fs-1 text-white"></i>
                    </div>
                    <Badge
                      bg="dark"
                      className="position-absolute top-0 start-0 m-2 bg-opacity-75 backdrop-blur shadow-sm border border-secondary"
                      style={{ borderRadius: '8px', fontSize: '0.7rem' }}
                    >
                      <i className={`bi ${item.type === 'youtube' ? 'bi-youtube text-danger' : 'bi-globe text-info'} me-1`}></i>
                      {item.type.toUpperCase()}
                    </Badge>
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title
                      className="h6 fw-bold text-white mb-3 lh-base"
                      style={{
                        height: '2.8rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.title}
                    </Card.Title>
                    <Card.Text
                      className="text-white mb-4"
                      style={{
                        fontSize: '0.85rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.5'
                      }}
                    >
                      {item.description || 'Explora este contenido técnico detallado en el sitio oficial.'}
                    </Card.Text>
                    <div className="mt-auto d-flex gap-2">
                      <Button
                        variant="primary"
                        className="w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                        style={{ borderRadius: '12px', fontSize: '0.85rem' }}
                      >
                        <span>Abrir</span>
                        <i className="bi bi-arrow-up-right-circle"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <style>{`
        .search-card:hover {
          transform: translateY(-8px);
          background-color: rgba(60, 60, 60, 0.8) !important;
          border-color: rgba(13, 110, 253, 0.4) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        .search-card:hover .card-overlay {
          opacity: 1;
          background: rgba(13, 110, 253, 0.2);
        }
        .backdrop-blur { backdrop-filter: blur(4px); }
        .lh-base { line-height: 1.4 !important; }
        .lh-lg { line-height: 1.8 !important; }
      `}</style>
    </Container>
  );
}

export default SearchResults;
