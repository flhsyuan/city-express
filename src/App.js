import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
//The data
import bases from "./data/bases";
import destinations from "./data/destinations";

//TODO
function getDetailedInfor(base, destination) {}

function Map() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedAddress(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: -37.8004, lng: 145.15 }}>
      {bases.map((base) => (
        <Marker
          key={base.id}
          position={{ lat: base.lat, lng: base.lng }}
          icon={{
            url: "/home.svg",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
          onClick={() => {
            setSelectedAddress(base);
          }}
        />
      ))}

      {selectedAddress && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedAddress(null);
          }}
          position={{ lat: selectedAddress.lat, lng: selectedAddress.lng }}
        >
          <div style={{ color: "red" }}>{selectedAddress.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyAcac0nkqdh - FishUW2e658_ - BFWaSBsNE"}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
