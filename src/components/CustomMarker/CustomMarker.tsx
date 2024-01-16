import {Marker, Popup} from "react-leaflet";
import Button from "react-bootstrap/Button";
import React from "react";
import L, {Icon} from "leaflet";
import {MarkerType} from "../../types/MarkerType";

type Props = {
  marker: MarkerType,
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
}

const customIcon = new Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/800px-Map_pin_icon_green.svg.png",
  iconSize: [30, 38],
})

export const CustomMarker: React.FC<Props> = ({ marker, setMarkers }) => {
  const {
    geo,
    id,
    numberPositionList
  } = marker;

  const handleDeleteMarker = (idMarker: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMarkers(prevState => prevState.filter(({ id }) => id !== idMarker));
  };

  const handleMarkerDragEnd = (idMarker: string, event: L.DragEndEvent) => {
    const newMarkerPosition: [number, number] = [event.target.getLatLng().lat, event.target.getLatLng().lng];
    setMarkers((prevState) => prevState.map(marker =>
      marker.id === idMarker ? { ...marker, geo: newMarkerPosition } : marker
    ));
  };

  return (
    <>
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
    </>
  )
}
