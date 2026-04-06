import { useState } from 'react';
import Header from "./src/components/Header/Header";
import SearchBar from "./src/components/SearchBar/SearchBar";
import SearchResults from "./src/components/SearchResults/SearchResults";
import Footer from "./src/components/Footer/Footer";
import NewsList from "./src/components/NewsList/NewsList";
import { Spinner } from 'react-bootstrap';
import { noticias, canalesYoutube } from "./src/components/NewsList/BancoLink";

function App() {
  {/*estados */}
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const normalizar = (texto) => {
    return texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const buscarEnLocal = (query) => {
    const queryNormalizado = normalizar(query).replace('@', '');
    const resultados = [];

    canalesYoutube.forEach(canal => {
      const tituloNormalizado = normalizar(canal.titulo);
      const enlaceNormalizado = normalizar(canal.enlace);
      if (tituloNormalizado.includes(queryNormalizado) || enlaceNormalizado.includes(queryNormalizado)) {
        resultados.push({
          id: canal.id,
          title: canal.titulo,
          url: canal.enlace,
          thumbnail: canal.thumbnail,
          description: `Canal de YouTube: ${canal.titulo}`,
          type: 'youtube'
        });
      }
    });

    noticias.forEach(noticia => {
      const tituloNormalizado = normalizar(noticia.titulo);
      const descripcionNormalizado = normalizar(noticia.descripcion || '');
      if (tituloNormalizado.includes(queryNormalizado) || descripcionNormalizado.includes(queryNormalizado)) {
        resultados.push({
          id: noticia.id + 1000,
          title: noticia.titulo,
          url: noticia.enlace,
          description: noticia.descripcion,
          type: 'web'
        });
      }
    });

    return resultados;
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setResults([]);

    const resultadosLocales = buscarEnLocal(query);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(
        `${apiUrl}/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      const resultadosAPI = data.results || [];
      
      const idsLocales = new Set(resultadosLocales.map(r => r.id));
      const urlsLocales = new Set(resultadosLocales.map(r => r.url));
      const resultadosAPIUnicos = resultadosAPI.filter(r => !idsLocales.has(r.id) && !urlsLocales.has(r.url));
      
      const urlsVistas = new Set([...resultadosLocales, ...resultadosAPIUnicos].map(r => r.url));
      const resultadosAPISinDuplicados = resultadosAPIUnicos.filter(r => !urlsVistas.has(r.url));
      
      setResults([...resultadosLocales, ...resultadosAPISinDuplicados]);
    } catch (error) {
      console.error('Error al buscar:', error);
      setResults(resultadosLocales);
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
