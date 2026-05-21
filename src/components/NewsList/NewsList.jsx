import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Spinner, Container, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// CAMBIO EXCLUSIVO AQUÍ: Definimos primero la URL de producción y luego la local
const API_URLS = [
  import.meta.env.VITE_API_URL || 'https://newsbackfastapi.vercel.app',
  'http://localhost:8000'
];

const API_URL = API_URLS[0];

function NewsList() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const procesarNoticias = (data) => {
    return data.map((item) => {
      let enlace = item.enlace;

      if (!enlace) {
        return null;
      }

      if (!enlace.startsWith('http://') && !enlace.startsWith('https://')) {
        enlace = 'https://' + enlace;
      }

      let imagen = item.thumbnail || item.thumbnail_url;
      if (!imagen) {
        imagen = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(enlace)}?w=1280`;
      }

      let fuente = 'Fuente desconocida';
      try {
        fuente = new URL(enlace).hostname.replace('www.', '');
      } catch {
        fuente = 'Fuente desconocida';
      }

      return {
        id: item.id,
        titulo: item.titulo || 'Sin título',
        descripcion: item.descripcion || 'Haz clic para ver la noticia',
        enlace: enlace,
        imagen: imagen,
        fuente: fuente,
        fecha: new Date().toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short'
        })
      };
    }).filter(Boolean);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      for (const url of API_URLS) {
        try {
          const response = await fetch(`${url}/enlaces`, {
            signal: AbortSignal.timeout(5000)
          });
          if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
          const data = await response.json();

          let arrayData = [];
          if (Array.isArray(data)) {
            arrayData = data;
          } else if (data && Array.isArray(data.enlaces)) {
            arrayData = data.enlaces;
          }

          if (arrayData.length > 0) {
            const noticiasFiltradas = arrayData.filter(item => item.id >= 1 && item.id <= 5);
            const procesadas = procesarNoticias(noticiasFiltradas);
            setNoticias(procesadas.length > 0 ? procesadas : procesarNoticias(arrayData.slice(0, 5)));
            setCargando(false);
            return;
          }
        } catch {
          continue;
        }
      }
      setError('No se pudieron cargar las noticias');
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const handleNoticiaClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (cargando) {
    return (
      <div className="d-flex   flex-column align-items-center justify-content-center my-5 py-5">
        <Spinner animation="grow" variant="primary" />
        <span className="mt-3 text-secondary fw-bold">Actualizando titulares...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Badge bg="danger" className="p-2">Error de conexión</Badge>
        <p className="text-muted mt-2 small">{error}</p>
      </Container>
    );
  }

  if (noticias.length === 0) {
    return (
      <Container className="text-center my-5 py-5">
        <Badge bg="secondary" className="p-2">No hay noticias disponibles</Badge>
        <p className="text-muted mt-2 small">Intenta más tarde</p>
      </Container>
    );
  }

  return (
    <div className="news-carousel-wrapper shadow-lg rounded-4 overflow-hidden">
      <Carousel
        activeIndex={index}
        onSelect={(idx) => setIndex(idx)}
        interval={6000}
        pause="hover"
        indicators={true}
        className="bg-dark"
      >
        {noticias.map((noticia) => (
          <Carousel.Item key={noticia.id}>
            {/* Contenedor de Imagen con Overlay Dinámico */}
            <div
              className="position-relative w-100"
              style={{
                height: '24rem',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%), url(${noticia.imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.5s ease'
              }}
            >
              {/* Contenido flotante */}
              <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Badge bg="primary" className="text-uppercase px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {noticia.fuente}
                  </Badge>
                  <span className="text-white-50 small">| {noticia.fecha}</span>
                </div>

                <h2 className="h4 fw-bold mb-2 text-truncate-2" style={{ lineHeight: '1.2' }}>
                  {noticia.titulo}
                </h2>

                <p className="small text-white-50 mb-3 d-none d-md-block text-truncate-2">
                  {noticia.descripcion}
                </p>

                <Button
                  onClick={() => handleNoticiaClick(noticia.enlace)}
                  variant="light"
                  size="sm"
                  className="fw-bold rounded-pill px-4 shadow-sm"
                  style={{ zIndex: 10, position: 'relative', pointerEvents: 'auto' }}

                >
                  Leer más
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Estilos CSS Inline para corregir detalles */}
      <style>{`
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .carousel-indicators [data-bs-target] {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 5px;
        }
        .news-carousel-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default NewsList;
