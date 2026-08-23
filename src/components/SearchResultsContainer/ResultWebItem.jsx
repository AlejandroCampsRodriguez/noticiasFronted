import { Card, Badge, Button } from 'react-bootstrap';

function ResultWebItem({ data }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <Card 
        className="h-100 border-0"
        style={{ 
          cursor: 'pointer', 
          backgroundColor: '#2d2d2d',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onClick={() => window.open(data.url, '_blank', 'noopener,noreferrer')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Card.Body className="p-3 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge bg="primary" className="text-uppercase">
              <i className="bi bi-globe2 me-1"></i>Web
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
            {data.title}
          </Card.Title>

          <Card.Text 
            className="text-secondary small flex-grow-1 mb-3"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {data.description}
          </Card.Text>

          <div className="text-muted small mb-2" style={{ fontSize: '0.75rem' }}>
            <i className="bi bi-link-45deg me-1"></i>
            {new URL(data.url).hostname}
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            className="mt-auto"
            style={{ borderRadius: '20px' }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, '_blank', 'noopener,noreferrer');
            }}
          >
            <i className="bi bi-box-arrow-up-right me-2"></i>
            Visitar
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultWebItem;
