import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
  useMap,
  Pane,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { point } from "@turf/helpers";
import { inside } from "@turf/turf";
import bbox from "@turf/bbox";
import { polygon } from "@turf/helpers";
import { featureCollection } from "@turf/helpers";
import { featureEach } from "@turf/meta";
import L from "leaflet";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";

const MapComponent = ({ country }) => {
  // redux
  const cords = useSelector((state) => state.cords.value);
  console.log({ cords });
  //states
  // const [loading, setLoading] = useState(true);
  // const map = useMapEvents();
  // map.setCenter();
  const [position, setPosition] = useState([20, 38]);

  useEffect(() => {
    console.log({ value: cords });
    setPosition(cords);
    console.log({ position });
  }, [cords]);

  function ChangeMapView({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        <ChangeMapView center={position} />
      </MapContainer>
    </>
  );
};

export default MapComponent;
