import { Card, Badge, Button } from 'react-bootstrap';

function getDomain(url) {
  if (!url) return 'Referencia IA';
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'Referencia IA';
  }
}

function ResultWebItem({ data }) {
  const sinEnlace = !data.url;
  const relevancia = data.similarity != null ? `${Math.round(data.similarity * 100)}%` : null;

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <Card
        className="h-100 border-0"
        style={{
          cursor: sinEnlace ? 'default' : 'pointer',
          backgroundColor: '#2d2d2d',
          opacity: sinEnlace ? 0.85 : 1,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onClick={() => {
          if (!sinEnlace) window.open(data.url, '_blank', 'noopener,noreferrer');
        }}
        onMouseEnter={(e) => {
          if (sinEnlace) return;
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
            {relevancia && (
              <Badge bg="success" className="bg-opacity-75">
                <i className="bi bi-lightning-charge-fill me-1"></i>
                {relevancia}
              </Badge>
            )}
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
            {getDomain(data.url)}
          </div>

          {sinEnlace ? (
            <Button
              variant="secondary"
              size="sm"
              className="mt-auto"
              disabled
              style={{ borderRadius: '20px' }}
            >
              <i className="bi bi-cpu me-2"></i>
              Referencia IA
            </Button>
          ) : (
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
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultWebItem;
