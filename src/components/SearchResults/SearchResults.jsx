import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center my-5 py-5">
        <i className="bi bi-search fs-1 text-muted"></i>
        <p className="text-muted mt-3">No se encontraron resultados.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-light mb-0">
          <i className="bi bi-collection-play me-2"></i>
          Resultados ({results.length})
        </h5>
      </div>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {results.map((item) => (
          <div className="col" key={item.id}>
            <Card
              className="h-100 border-0 overflow-hidden"
              style={{ 
                cursor: 'pointer', 
                backgroundColor: '#2d2d2d',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {item.type === 'youtube' && item.thumbnail && (
                <div className="position-relative overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ 
                      height: '160px', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 end-0 m-2"
                  >
                    <i className="bi bi-youtube me-1"></i>YouTube
                  </Badge>
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ background: 'rgba(0,0,0,0.1)' }}
                  />
                </div>
              )}

              <Card.Body className="d-flex flex-column p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge 
                    bg={item.type === 'youtube' ? 'danger' : 'primary'} 
                    className="text-uppercase fs-6"
                  >
                    {item.type}
                  </Badge>
                </div>

                <Card.Title 
                  className="h6 fw-bold text-light mb-2" 
                  style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {item.title}
                </Card.Title>

                {item.type === 'web' && item.description && (
                  <Card.Text 
                    className="text-secondary small flex-grow-1 mb-3" 
                    style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.description}
                  </Card.Text>
                )}

                <Button
                  variant={item.type === 'youtube' ? 'outline-danger' : 'outline-primary'}
                  size="sm"
                  className="mt-auto d-flex align-items-center justify-content-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.url, '_blank', 'noopener,noreferrer');
                  }}
                  style={{ borderRadius: '20px' }}
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                  Ver {item.type === 'youtube' ? 'video' : 'enlace'}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
