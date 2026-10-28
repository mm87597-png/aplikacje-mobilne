const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b39f68d878260c5a0dc7a6a024ae11e4';

export async function fetchWeather(query) {
  const params = new URLSearchParams({
    q: query.trim().toLowerCase(),
    units: 'metric',
    lang: 'pl',
    appid: API_KEY,
  });

  let response;
  try {
      response = await fetch(`${URL}?${params}`);
  } catch {
    throw new Error('Brak połączenia z internetem.');
  }

  if (!response.ok) {
    if (response.status === 404) throw new Error('Nie znaleziono miasta.');
    if (response.status === 401) {
      throw new Error('Nieprawidłowy lub nieaktywny klucz API.');
    }
      throw new Error('Błąd serwera pogody (' + response.status + ').');
  }

  return response.json();
}
