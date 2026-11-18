import { IonContent, IonHeader,  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';


type Item = {
  src: string;
  text: string;
};

const items: Item[] = [
  { src: '/img/las.jpg', text: 'Las' },
  { src: '/img/rzeka.jpg', text: 'Rzeka' },
  { src: '/img/miasto.jpg', text: 'Miasto' },
  { src: '/img/morze.jpg', text: 'Morze' },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Zjęcia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Zdjęcia</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
      {items.map((image) => (
        <IonItem key={image.src}>
          <IonThumbnail slot="start">
            <img src={image.src} alt={image.text} loading="lazy" />
          </IonThumbnail>
          <IonLabel>{image.text}</IonLabel>
        </IonItem>
      ))}
    </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
