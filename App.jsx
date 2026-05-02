import { useState } from 'react';
import Header from "./src/components/Header/Header";
import SearchBar from "./src/components/SearchBar/SearchBar";
import SearchResults from "./src/components/SearchResults/SearchResults";
import Footer from "./src/components/Footer/Footer";
import NewsList from "./src/components/NewsList/NewsList";
import { Spinner } from 'react-bootstrap';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const normalizar = (texto) => {
    return texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setResults([]);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(
        `${apiUrl}/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      const resultadosAPI = data.results || [];
      
      const resultadosFormateados = resultadosAPI.map(r => ({
        id: r.id,
        title: r.titulo,
        url: r.enlace,
        thumbnail: r.thumbnail,
        description: r.descripcion,
        type: r.tipo_contenido || 'web'
      }));
      
      setResults(resultadosFormateados);
    } catch (error) {
      console.error('Error al buscar:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <NewsList />
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" />
            <p className="mt-2 text-muted">Buscando en Web y YouTube...</p>
          </div>
        )}
        {!loading && <SearchResults results={results} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
