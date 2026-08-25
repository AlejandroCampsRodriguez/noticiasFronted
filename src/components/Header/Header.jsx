import { Button } from 'react-bootstrap';

// header
function Header({ theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header
      className="py-4 shadow-sm border-bottom"
      style={{
        background: isDark ? '#121212' : '#ffffff',
        color: isDark ? '#fff' : '#1a1a1a',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
      }}
    >
      <div className="container d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="text-center flex-grow-1">
          <h1
            className="fw-bold display-6 text-uppercase mb-2"
            style={{ color: isDark ? '#fff' : '#1a1a1a' }}
          >
            Noticias para desarrolladores
          </h1>
          <p
            className="lead mt-0 mb-0"
            style={{ color: isDark ? '#adb5bd' : '#6c757d', fontSize: '0.95rem' }}
          >
            <i className="bi bi-globe"></i> Web &nbsp;
            <i className="bi bi-phone"></i> Mobile &nbsp;
            <i className="bi bi-code-slash"></i> React &nbsp;
            <i className="bi bi-terminal"></i> Python &nbsp;
            <i className="bi bi-cpu"></i> Tecnología 
          </p>
        </div>

        <Button
          variant={isDark ? 'outline-light' : 'outline-dark'}
          className="rounded-pill d-flex align-items-center gap-2 shadow-sm"
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          style={{ fontSize: '0.85rem' }}
        >
          <i className={`bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
          {isDark ? 'Claro' : 'Oscuro'}
        </Button>
      </div>
    </header>
  );
}

export default Header;
