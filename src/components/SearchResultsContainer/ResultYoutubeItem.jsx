import { Card, Badge, Button } from 'react-bootstrap';

function ResultYoutubeItem({ data }) {
  return (
    <div className="col">
      <Card 
        className="h-100 border-0 overflow-hidden"
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
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={data.thumbnail}
            alt={data.title}
            style={{
              height: '140px',
              objectFit: 'cover'
            }}
          />
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            <i className="bi bi-play-fill me-1"></i>YouTube
          </Badge>
        </div>

        <Card.Body className="p-3">
          <Card.Title 
            className="h6 fw-bold text-light mb-2"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.9rem'
            }}
          >
            {data.title}
          </Card.Title>

          <Button
            variant="outline-danger"
            size="sm"
            className="w-100 mt-2"
            style={{ borderRadius: '20px' }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, '_blank', 'noopener,noreferrer');
            }}
          >
            <i className="bi bi-play-circle me-2"></i>
            Ver video
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultYoutubeItem;
