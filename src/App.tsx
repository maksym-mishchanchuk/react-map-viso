import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, {Icon, LeafletMouseEvent} from 'leaflet';
import './index.css'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

type Marker = {
  numberPositionList: number
  geo: [number, number],
  id: string,
}

const customIcon = new Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/800px-Map_pin_icon_green.svg.png",
  iconSize: [30, 38],
})


const App: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

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

  const handleDeleteMarker = (idMarker: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMarkers(prevState => prevState.filter(({ id }) => id !== idMarker));
  };

  const handleDeleteAllMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMarkers([]);
  };

  const handleMarkerDragEnd = (idMarker: string, event: L.DragEndEvent) => {
    const newMarkerPosition: [number, number] = [event.target.getLatLng().lat, event.target.getLatLng().lng];
    setMarkers((prevState) => prevState.map(marker =>
      marker.id === idMarker ? { ...marker, geo: newMarkerPosition } : marker
    ));
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

      {markers.map(({id, geo, numberPositionList}) => (
        <Marker
          key={id}
          position={geo}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: (event) => handleMarkerDragEnd(id, event),
          }}
        >
          <Popup>{`Маркер ${numberPositionList}`}
            <br/>
            <Button
              style={{
                marginTop: '10px',
              }}
              size="sm"
              variant="primary"
              onClick={(event) => handleDeleteMarker(id, event)}>
              Delete
            </Button>
          </Popup>
        </Marker>
      ))}

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
          onClick={(event) => handleDeleteAllMarkers(event)}
        >
          Delete All
        </Button>
      )}

    </MapContainer>
  );
};

export default App;
