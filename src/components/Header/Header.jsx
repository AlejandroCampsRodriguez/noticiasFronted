
// header
function Header() {
  return (
    <header className="bg-dark text-light py-4 shadow-sm">
      <div className="container text-center">
        <h1 className="fw-bold display-6 text-uppercase">
          Noticias para desarrolladores
        </h1>
        <p className="lead text-secondary mt-2">
          <i className="bi bi-globe"></i> Web &nbsp;
          <i className="bi bi-phone"></i> Mobile &nbsp;
          <i className="bi bi-code-slash"></i> React &nbsp;
          <i className="bi bi-terminal"></i> Python &nbsp;
          <i className="bi bi-cpu"></i> Tecnología
        </p>
      </div>
    </header>
  )
}

export default Header
