import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import './index.css'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { db } from './firebase';
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { MarkerType } from "./types/MarkerType";
import { MarkersList } from "./components/MarkersList/MarkersList";

const App: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    const updateFirebaseData = async () => {
      const firebaseData = markers.map(({ numberPositionList, geo }) => ({
        Location: { Lat: geo[0], Long: geo[1] },
        Timestamp: new Date(),
        Next: markers.length + 1,
      }));

      const questCollectionRef = collection(db, 'quests');

      await Promise.all(firebaseData.map(async (data, index) => {
        await setDoc(doc(questCollectionRef, `Quest ${index + 1}`), data);
      }));

      return "Мітку додану в базу";
    };

    updateFirebaseData().then(result => console.log(result));
  }, [markers]);

  //function for reading firebaseData
  const readDataFromFirestore = async () => {
    const questCollectionRef = collection(db, 'quests');

    try {
      const querySnapshot = await getDocs(questCollectionRef);

      querySnapshot.forEach((doc) => {
        console.log('Document ID:', doc.id);
        console.log('Document Data:', doc.data());
      });
    } catch (error) {
      console.error('Error reading data from Firestore:', error);
    }
  };
  ///

  const handleMapClick = (event: LeafletMouseEvent) => {
    const newMarkerPosition: [number, number] = [event.latlng.lat, event.latlng.lng];

    const newMarker = {
      numberPositionList: markers.length + 1,
      geo: newMarkerPosition,
      id: uuidv4(),
    };

    setMarkers((prevState) => [...prevState, newMarker]);
  };

  const MapEvents = () => {
    useMapEvent('click', handleMapClick);
    return null;
  };

  const handleDeleteAllMarkers = () => {
    setMarkers([]);
  };

  return (
    <MapContainer
      center={[49.0, 31.0]}
      zoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <MarkersList
        markers={markers}
        setMarkers={setMarkers}
      />

      {!!markers.length && (
        <Button
          style={{
            position: 'absolute',
            top: '15px',
            left: '50px',
            zIndex: 1000,
            marginTop: '10px',
          }}
          size="sm"
          variant="primary"
          onClick={() => handleDeleteAllMarkers()}
        >
          Delete All
        </Button>
      )}

    </MapContainer>
  );
};

export default App;
