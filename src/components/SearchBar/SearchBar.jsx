import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

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
        <span className="badge bg-white text-primary" style={{ fontSize: '0.7rem' }}>AI Powered</span>
      </div>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Buscar canales o noticias (ej: midudev)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
