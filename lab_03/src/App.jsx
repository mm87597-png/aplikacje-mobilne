import { useEffect, useState } from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  async function search(event) {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    } catch (err) {
      setWeather(null);
      setError(err.message || 'Nie udało się pobrać pogody.');
    } finally {
      setLoading(false);
    }
  }

  const measuredAt = weather
    ? new Date(weather.dt * 1000).toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <main className="main-container">
      <h1>Pogoda</h1>

      <form onSubmit={search}>
        <input
          type="search"
          className="search"
          placeholder="Wpisz miasto..."
          aria-label="Nazwa miasta"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      {!online && weather && (
        <p className="message">
          Brak połączenia — pokazuję ostatnio pobrane dane.
        </p>
      )}
      {!online && !weather && (
        <p className="message">Brak połączenia z internetem.</p>
      )}
      {loading && <p className="message">Pobieranie danych...</p>}
      {error && <p className="message error">{error}</p>}

      {weather && (
        <section className="city" aria-live="polite">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>

          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>°C</sup>
          </div>

          <div className="info">
            <img
              className="city-icon"
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>Ciśnienie: {weather.main.pressure} hPa</p>
            <p>Wilgotność: {weather.main.humidity}%</p>
            <p>Wiatr: {weather.wind.speed} m/s</p>
            {weather.wind.gust != null && (
              <p>Porywy wiatru: {weather.wind.gust} m/s</p>
            )}
            {weather.wind.deg != null && (
              <p>Kierunek wiatru: {weather.wind.deg}°</p>
            )}
            <p>Pomiar: {measuredAt}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
