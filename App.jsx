import { useState, useEffect } from 'react';
import Header from "./src/components/Header/Header";
import SearchBar from "./src/components/SearchBar/SearchBar";
import SearchResults from "./src/components/SearchResults/SearchResults";
import Footer from "./src/components/Footer/Footer";
import NewsList from "./src/components/NewsList/NewsList";
import Sidebar from "./src/components/Sidebar/Sidebar";
import { Spinner } from 'react-bootstrap';

const API_URLS = [
  import.meta.env.VITE_API_URL || 'https://newsbackfastapi.vercel.app',
  'http://localhost:8000'
];

function App() {
  const [results, setResults] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearch = async (searchQuery) => {
    const q = searchQuery.trim();
    if (!q) return;
    setLoading(true);
    setResults([]);
    setAiSummary('');
    setQuery(q);

    for (const apiUrl of API_URLS) {
      try {
        const response = await fetch(
          `${apiUrl}/search/rag?q=${encodeURIComponent(q)}&limit=8`
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();

        const resultadosFormateados = (data.articles || []).map(r => ({
          id: r.id,
          title: r.titulo,
          url: r.enlace,
          thumbnail: r.thumbnail,
          description: r.descripcion,
          type: r.tipo_contenido || 'web',
          similarity: r.similarity ?? null
        }));

        const resumenCaido = (data.ai_summary || '').includes('No se pudo generar el resumen');
        if (resumenCaido && apiUrl !== API_URLS[API_URLS.length - 1]) {
          throw new Error('Resumen IA no disponible en este backend');
        }

        setAiSummary(data.ai_summary || '');
        setResults(resultadosFormateados);
        setLoading(false);
        return;
      } catch {
        continue;
      }
    }

    // Fallback: búsqueda de texto clásica
    for (const apiUrl of API_URLS) {
      try {
        const response = await fetch(
          `${apiUrl}/search?q=${encodeURIComponent(q)}`
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        const resultadosAPI = data.results || [];

        const resultadosFormateados = resultadosAPI.map(r => ({
          id: r.id,
          title: r.titulo,
          url: r.enlace,
          thumbnail: r.thumbnail,
          description: r.descripcion,
          type: r.tipo_contenido || 'web',
          similarity: null
        }));

        setResults(resultadosFormateados);
        setLoading(false);
        return;
      } catch {
        continue;
      }
    }

    console.error('Error al buscar: no se pudo conectar');
    setResults([]);
    setLoading(false);
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 app-theme app-theme-${theme}`}
      data-bs-theme={theme}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="d-flex flex-grow-1 content-row">
        <Sidebar
          title="Destacadas"
          icon="bi-collection-play-fill"
          withThumbnail={true}
          sliceStart={0}
          sliceEnd={5}
        />
        <main className="flex-grow-1 mt-3 px-2 px-lg-3 main-content">
          <NewsList />
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" />
              <p className="mt-2 text-muted">Analizando noticias con IA...</p>
            </div>
          )}
          {!loading && (
            <SearchResults
              aiSummary={aiSummary}
              results={results}
              query={query}
              onSearch={handleSearch}
            />
          )}
        </main>
        <Sidebar
          title="Más noticias"
          icon="bi-newspaper"
          withThumbnail={false}
          sliceStart={5}
          sliceEnd={10}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
