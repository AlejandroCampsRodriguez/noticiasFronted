import ResultWebItem from './ResultWebItem';
import ResultYoutubeItem from './ResultYoutubeItem';

function SearchResultsContainer({ results }) {
  if (!results || results.length === 0) return null;

  const webResults = results.filter(r => r.type === 'web');
  const youtubeResults = results.filter(r => r.type === 'youtube');

  return (
    <section className="container-fluid px-2 px-md-4 py-3">
      {youtubeResults.length > 0 && (
        <div className="mb-5">
          <h5 className="fw-bold text-light mb-3 d-flex align-items-center">
            <i className="bi bi-youtube text-danger me-2 fs-4"></i>
            Videos ({youtubeResults.length})
          </h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
            {youtubeResults.map((item) => (
              <ResultYoutubeItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}

      {webResults.length > 0 && (
        <div>
          <h5 className="fw-bold text-light mb-3 d-flex align-items-center">
            <i className="bi bi-globe2 text-primary me-2 fs-4"></i>
            Web ({webResults.length})
          </h5>
          <div className="row">
            {webResults.map((item) => (
              <ResultWebItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchResultsContainer;
