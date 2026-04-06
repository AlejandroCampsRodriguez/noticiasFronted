import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const noticiasRespaldo = [
  {
    id: 1,
    titulo: "Noticias para desarrolladores",
    descripcion: "Actualidad sobre desarrollo web y software",
    enlace: "https://dev.to",
    thumbnail: null
  },
  {
    id: 2,
    titulo: "Frontend y JavaScript",
    descripcion: "Tendencias y novedades del frontend moderno",
    enlace: "https://midu.dev",
    thumbnail: null
  },
  {
    id: 3,
    titulo: "Mobile y tecnología",
    descripcion: "Noticias sobre desarrollo móvil",
    enlace: "https://www.reactnative.dev/blog",
    thumbnail: null
  },
  {
    id: 4,
    titulo: "Recursos de programación",
    descripcion: "Noticias y recursos de programación web",
    enlace: "https://www.noticias.dev/",
    thumbnail: null
  }
];

function NewsList() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const procesarNoticias = (data) => {
    console.log('Datos recibidos:', data);
    return data.map((item) => {
      let imagen = item.thumbnail;
      const enlace = item.enlace;
      
      console.log('Enlace procesando:', enlace);
      
      if (!imagen) {
        imagen = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(enlace)}?w=1200`;
      }
      
      return {
        id: item.id,
        titulo: item.titulo || 'Sin título',
        descripcion: item.descripcion || 'Haz clic para ver la noticia',
        enlace: enlace,
        imagen: imagen,
        fuente: new URL(enlace).hostname.replace('www.', ''),
        fecha: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
    });
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const response = await fetch(`${API_URL}/enlaces`, {
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setNoticias(procesarNoticias(data));
        } else {
          setNoticias(procesarNoticias(noticiasRespaldo));
        }
      } catch (error) {
        console.warn('Error conectando al servidor, usando datos de respaldo:', error.message);
        setNoticias(procesarNoticias(noticiasRespaldo));
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleNoticiaClick = (url) => {
    console.log('Click en noticia:', url);
    window.open(url, '_blank');
  };

  if (cargando) {
    return (
      <div className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando noticias...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando noticias...</p>
      </div>
    );
  }

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} pause="hover" slide={false}>
        {noticias.map((noticia, idx) => (
          <Carousel.Item key={noticia.id || idx}>
            <div 
              className="d-block w-100 position-relative"
              style={{ 
                height: '450px',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${noticia.imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleNoticiaClick(noticia.enlace);
              }}
            >
            </div>
            
            <Carousel.Caption 
              className="text-start p-4"
              style={{
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                bottom: 0,
                left: 0,
                right: 0,
                paddingBottom: '60px'
              }}
            >
              <Card className="bg-dark bg-opacity-75 border-0">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-primary bg-opacity-90">
                      {noticia.fuente}
                    </span>
                    <small className="text-light opacity-75">
                      {noticia.fecha}
                    </small>
                  </div>
                  <Card.Title className="text-white mb-2 fs-4">
                    {noticia.titulo}
                  </Card.Title>
                  <Card.Text className="text-light mb-3 opacity-90">
                    {noticia.descripcion}
                  </Card.Text>
                  <Button 
                    variant="outline-light"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNoticiaClick(noticia.enlace);
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    <span>Leer noticia completa</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        
        {noticias.length === 0 && (
          <Carousel.Item>
            <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
              <p className="text-muted">No hay noticias disponibles</p>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </>
  );
}

export default NewsList;