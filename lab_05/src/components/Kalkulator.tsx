import { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';

const blad = 'Nie można dzielić przez zero';

function Kalkulator() {
  const [wyswietlacz, setWyswietlacz] = useState('0');
  const [poprzedniaLiczba, setPoprzedniaLiczba] = useState<number | null>(null);
  const [dzialanie, setDzialanie] = useState<string | null>(null);
  const [pokazAlert, setPokazAlert] = useState(false);

const wpiszCyfre = (cyfra: string) => {
  if (wyswietlacz === '0' || wyswietlacz === '' || wyswietlacz === blad) {
    setWyswietlacz(cyfra);
  } else {
    setWyswietlacz(wyswietlacz + cyfra);
  }
};

  const wpiszKropke = () => {
    if (wyswietlacz === blad || wyswietlacz === '') {
      setWyswietlacz('0.');
    } else if (!wyswietlacz.includes('.')) {
      setWyswietlacz(wyswietlacz + '.');
    }
  };

  const wybierzDzialanie = (noweDzialanie: string) => {
    if (wyswietlacz === blad) return;

    setPoprzedniaLiczba(Number(wyswietlacz || '0'));
    setDzialanie(noweDzialanie);
    setWyswietlacz('');
  };

  const obliczWynik = () => {
    if (
      poprzedniaLiczba === null ||
      dzialanie === null ||
      wyswietlacz === ''
    ) {
      return;
    }

    const drugaLiczba = Number(wyswietlacz);
    let wynik: number;

    switch (dzialanie) {
      case '+':
        wynik = poprzedniaLiczba + drugaLiczba;
        break;
      case '−':
        wynik = poprzedniaLiczba - drugaLiczba;
        break;
      case '×':
        wynik = poprzedniaLiczba * drugaLiczba;
        break;
      case '÷':
      if (drugaLiczba === 0) {
        setWyswietlacz('0');
        setPoprzedniaLiczba(null);
        setDzialanie(null);
        setPokazAlert(true);
        return;
      }
        wynik = poprzedniaLiczba / drugaLiczba;
        break;
      default:
        return;
    }

    setWyswietlacz(String(parseFloat(wynik.toFixed(10))));
    setPoprzedniaLiczba(null);
    setDzialanie(null);
  };

  const resetuj = () => {
    setWyswietlacz('0');
    setPoprzedniaLiczba(null);
    setDzialanie(null);
  };

  const wiersze = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '−'],
    ['C', '0', '.', '+'],
  ];

  const kliknijPrzycisk = (wartosc: string) => {
    if (wartosc === 'C') {
      resetuj();
    } else if (wartosc === '.') {
      wpiszKropke();
    } else if ('0123456789'.includes(wartosc)) {
      wpiszCyfre(wartosc);
    } else {
      wybierzDzialanie(wartosc);
    }
  };

  return (
    <IonCard style={{ maxWidth: '380px', margin: '24px auto' }}>
      <IonCardContent>
        <h2>Kalkulator</h2>
        <h1>{wyswietlacz || '0'}</h1>

        <IonGrid>
          {wiersze.map((wiersz, numerWiersza) => (
            <IonRow key={numerWiersza}>
              {wiersz.map((przycisk) => (
                <IonCol size="3" key={przycisk}>
                  <IonButton
                    expand="block"
                    onClick={() => kliknijPrzycisk(przycisk)}
                  >
                    {przycisk}
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          ))}

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={obliczWynik}>
                =
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
        isOpen={pokazAlert}
        header="Błąd"
        message="Nie można dzielić przez zero"
        buttons={['OK']}
        onDidDismiss={() => setPokazAlert(false)}
      />
      </IonCardContent>
    </IonCard>
  );
}

export default Kalkulator;