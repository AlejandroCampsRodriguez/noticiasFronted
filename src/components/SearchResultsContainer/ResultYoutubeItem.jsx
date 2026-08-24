import { Card, Badge, Button } from 'react-bootstrap';

function ResultYoutubeItem({ data }) {
  const sinEnlace = !data.url;
  const relevancia = data.similarity != null ? `${Math.round(data.similarity * 100)}%` : null;
  const imagen = data.thumbnail || (data.url
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(data.url)}?w=400`
    : 'https://via.placeholder.com/400x140?text=IA');

  return (
    <div className="col">
      <Card
        className="h-100 border-0 overflow-hidden"
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
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={imagen}
            alt={data.title}
            style={{
              height: '140px',
              objectFit: 'cover'
            }}
          />
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            <i className="bi bi-play-fill me-1"></i>YouTube
          </Badge>
          {relevancia && (
            <Badge bg="success" className="position-absolute top-0 start-0 m-2 bg-opacity-75">
              <i className="bi bi-lightning-charge-fill me-1"></i>
              {relevancia}
            </Badge>
          )}
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

          {sinEnlace ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-100 mt-2"
              disabled
              style={{ borderRadius: '20px' }}
            >
              <i className="bi bi-cpu me-2"></i>
              Referencia IA
            </Button>
          ) : (
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
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultYoutubeItem;
