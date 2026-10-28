# Lab 03 - Aplikacja pogodowa PWA

Aplikacja pokazuje aktualną pogodę dla wybranego miasta. Dane pobiera z serwisu OpenWeatherMap. Aplikacja PWA zapisuje pliki strony i wcześniej pobrane dane pogodowe, dzięki czemu może wyświetlić ostatnio sprawdzoną pogodę bez połączenia z internetem.

## Funkcje

- wyszukiwanie pogody według nazwy miasta,
- wyświetlanie temperatury, opisu pogody i ikony,
- wyświetlanie ciśnienia, wilgotności i danych o wietrze,
- komunikaty o ładowaniu, błędach i braku internetu,
- działanie offline z wykorzystaniem wcześniej zapisanych danych,
- możliwość zainstalowania aplikacji PWA.

## Adres aplikacji

[Otwórz aplikację pogodową](https://lab3-852f8.web.app)

## Uruchomienie lokalne

W folderze `lab_03` uruchom:

```bash
npm install
npm run dev
```

Aby sprawdzić wersję produkcyjną i działanie offline:

```bash
npm run build
npm run preview
```

Otwórz adres podany przez Vite, zwykle `http://localhost:4173/`. Najpierw wyszukaj miasto przy włączonym internecie, a potem sprawdź to samo miasto offline.

## Zrzuty ekranu - komputer

![Pogoda na komputerze](pogoda.png)

![Działanie offline na komputerze](offline.png)

## Zrzuty ekranu - telefon

![Pogoda na telefonie](pogoda_tel.png)

![Działanie offline na telefonie](offline_tel.png)