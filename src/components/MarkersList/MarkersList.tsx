import React from "react";
import { MarkerType } from "../../types/MarkerType";
import {CustomMarker} from "../CustomMarker/CustomMarker";

type Props = {
  markers: MarkerType[],
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
}

export const MarkersList: React.FC<Props> = ({ markers, setMarkers }) => {
  return (
    <>
      {markers.map((marker) => (
      <React.Fragment key={marker.id}>
        <CustomMarker marker={marker} setMarkers={setMarkers} />
      </React.Fragment>
      ))}
    </>
  )
}
