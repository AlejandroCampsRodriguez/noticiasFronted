//
import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  const sugerencias = ['React', 'Python', 'Inteligencia Artificial', 'Desarrollo Móvil'];

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      <div className="d-flex justify-content-center mb-2">
        <div className="info-warning  d-inline-flex   gap-2 px-3 py-1 rounded-pill shadow-sm"
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            fontSize: '0.85rem',

            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
          <i className="bi bi-search" style={{ fontSize: '0.8rem' }}></i>
          <span>Smart Search</span>
        </div>
        <span className="badge  text-primary" style={{ fontSize: '0.7rem' }}>AI Powered</span>
      </div>
      <div className="mx-auto" style={{ maxWidth: '520px' }}>
        <InputGroup
          className="search-bar-glow shadow-lg"
          style={{ borderRadius: '18px', overflow: 'hidden' }}
        >
          <Form.Control
            type="text"
            placeholder="Buscar canales o noticias (ej: midudev)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              height: '60px',
              fontSize: '1.05rem',
              border: 'none',
              borderRadius: '18px 0 0 18px',
              paddingLeft: '1.4rem',
              backgroundColor: 'rgba(20,20,20,0.9)',
              color: '#fff'
            }}
          />
          <Button
            type="submit"
            variant="primary"
            className="fw-bold px-4"
            style={{
              height: '60px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0 18px 18px 0',
              background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)'
            }}
          >
            <i className="bi bi-search me-2"></i>
            Buscar
          </Button>
        </InputGroup>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
        {sugerencias.map((s) => (
          <Button
            key={s}
            variant="outline-secondary"
            size="sm"
            className="rounded-pill"
            onClick={() => onSearch(s)}
            style={{ fontSize: '0.75rem', borderColor: 'rgba(139,92,246,0.35)' }}
          >
            <i className="bi bi-stars me-1 text-warning"></i>
            {s}
          </Button>
        ))}
      </div>

      <style>{`
        .search-bar-glow {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          box-shadow: 0 0 0 2px rgba(139,92,246,0.5), 0 10px 30px rgba(99,102,241,0.3) !important;
        }
        .search-bar-glow:hover {
          box-shadow: 0 0 0 3px rgba(139,92,246,0.65), 0 12px 35px rgba(99,102,241,0.45) !important;
          transform: translateY(-2px);
        }
        .search-bar-glow:focus-within {
          box-shadow: 0 0 0 3px rgba(139,92,246,0.65), 0 14px 40px rgba(99,102,241,0.5) !important;
          transform: translateY(-2px);
        }
        .search-bar-glow .form-control::placeholder {
          color: rgba(255,255,255,0.45);
        }
        .search-bar-glow .form-control:focus {
          box-shadow: none;
          background-color: rgba(20,20,20,0.95);
          color: #fff;
        }
      `}</style>
    </Form>
  );
}

export default SearchBar;
