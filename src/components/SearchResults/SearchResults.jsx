import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';

function getSuggestions(query) {
  const base = (query || '').toLowerCase();
  const temas = [
    { label: 'React', q: 'React desarrollo frontend' },
    { label: 'Python', q: 'Python programación' },
    { label: 'Inteligencia Artificial', q: 'Inteligencia Artificial y Gemini' },
    { label: 'Desarrollo Móvil', q: 'desarrollo móvil Android iOS' },
    { label: 'DevOps', q: 'DevOps CI/CD despliegue' }
  ];
  return temas
    .filter(t => !base.includes(t.label.toLowerCase()))
    .slice(0, 4);
}

function SearchResults({ aiSummary, results, query, onSearch }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  };

  if ((!results || results.length === 0) && !aiSummary) {
    return (
      <div className="text-center my-5 py-5 animate__animated animate__fadeIn">
        <div className="mb-4">
          <i className="bi bi-search-heart fs-1 text-primary opacity-50"></i>
        </div>
        <h4 className="text-light fw-light">Sin coincidencias</h4>
        <p className="text-muted">Intenta con otros términos o categorías.</p>
      </div>
    );
  }

  const sugerencias = getSuggestions(query);

  return (
    <Container fluid className="px-3 px-md-5 py-4 animate__animated animate__fadeIn">
      {aiSummary && (
        <div className="ai-summary-box mb-5 p-4 rounded-4 animate__animated animate__fadeInUp" style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
          border: '1px solid rgba(139,92,246,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                <i className="bi bi-cpu fs-4 text-primary"></i>
              </div>
              <div>
                <h5 className="fw-bold text-white mb-0">Resumen IA</h5>
                <small className="text-muted">Generado con Gemini Flash · búsqueda semántica RAG</small>
              </div>
            </div>
            <Button
              variant="outline-light"
              size="sm"
              className="rounded-pill"
              onClick={handleCopy}
              style={{ fontSize: '0.78rem' }}
            >
              <i className={`bi ${copied ? 'bi-check2-circle text-success' : 'bi-clipboard'} me-1`}></i>
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
          <p className="text-white mb-0 lh-lg" style={{ fontSize: '0.95rem' }}>
            {aiSummary}
          </p>
        </div>
      )}

      {query && (
        <div className="mb-4">
          <p className="text-muted mb-2 small">
            <i className="bi bi-filter-circle me-1"></i>
            Resultados para: <span className="text-light fw-semibold">{query}</span>
          </p>
        </div>
      )}

      {results && results.length > 0 && (
        <SearchResultsContainer results={results} />
      )}

      {sugerencias.length > 0 && (
        <div className="mt-5 pt-4 border-top border-secondary">
          <h6 className="fw-bold text-white mb-3 d-flex align-items-center">
            <i className="bi bi-stars text-warning me-2"></i>
            Explora con IA
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {sugerencias.map((s) => (
              <Button
                key={s.label}
                variant="outline-light"
                size="sm"
                className="rounded-pill"
                onClick={() => onSearch && onSearch(s.q)}
                style={{ fontSize: '0.8rem', borderColor: 'rgba(139,92,246,0.4)' }}
              >
                <i className="bi bi-search me-1"></i>
                {s.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .search-card:hover {
          transform: translateY(-8px);
          background-color: rgba(60, 60, 60, 0.8) !important;
          border-color: rgba(13, 110, 253, 0.4) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        .search-card:hover .card-overlay {
          opacity: 1;
          background: rgba(13, 110, 253, 0.2);
        }
        .backdrop-blur { backdrop-filter: blur(4px); }
        .lh-base { line-height: 1.4 !important; }
        .lh-lg { line-height: 1.8 !important; }
      `}</style>
    </Container>
  );
}

export default SearchResults;
