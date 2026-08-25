import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const API_URLS = [
  import.meta.env.VITE_API_URL || 'https://newsbackfastapi.vercel.app'
];

function procesar(items) {
  return items
    .map((item) => {
      let enlace = item.enlace;
      if (!enlace) return null;
      if (!enlace.startsWith('http://') && !enlace.startsWith('https://')) {
        enlace = 'https://' + enlace;
      }

      let imagen = item.thumbnail || item.thumbnail_url;
      if (!imagen) {
        imagen = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(enlace)}?w=200`;
      }

      let fuente = 'Fuente';
      try {
        fuente = new URL(enlace).hostname.replace('www.', '');
      } catch {
        fuente = 'Fuente';
      }

      return {
        id: item.id,
        titulo: item.titulo || 'Sin título',
        descripcion: item.descripcion || '',
        enlace,
        imagen,
        fuente
      };
    })
    .filter(Boolean);
}

function Sidebar({ title, icon, withThumbnail = true, sliceStart = 0, sliceEnd = 5 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      for (const url of API_URLS) {
        try {
          const res = await fetch(`${url}/enlaces`, {
            signal: AbortSignal.timeout(8000)
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const arr = Array.isArray(data) ? data : data.enlaces || [];
          const procesados = procesar(arr);
          setItems(procesados.slice(sliceStart, sliceEnd));
          setLoading(false);
          return;
        } catch {
          continue;
        }
      }
      setLoading(false);
    };
    cargar();
  }, [sliceStart, sliceEnd]);

  const abrir = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="sidebar d-none d-lg-flex flex-column p-3">
      <div className="d-flex align-items-center mb-3 px-1">
        <i className={`bi ${icon} me-2 fs-5 text-primary`}></i>
        <h6 className="fw-bold mb-0 text-white">{title}</h6>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="grow" variant="primary" size="sm" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-secondary small px-1">Sin noticias disponibles.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item text-decoration-none rounded-3 p-2 d-flex gap-2"
              onClick={(e) => {
                e.preventDefault();
                abrir(item.enlace);
              }}
            >
              {withThumbnail && (
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="flex-shrink-0"
                  style={{
                    width: '68px',
                    height: '52px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              )}
              <div className="min-w-0">
                <div
                  className="text-white fw-semibold mb-1"
                  style={{
                    fontSize: '0.82rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.3
                  }}
                >
                  {item.titulo}
                </div>
                {!withThumbnail && item.descripcion && (
                  <div
                    className="text-secondary"
                    style={{
                      fontSize: '0.72rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.4
                    }}
                  >
                    {item.descripcion}
                  </div>
                )}
                <small className="text-secondary" style={{ fontSize: '0.68rem' }}>
                  {item.fuente}
                </small>
              </div>
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
