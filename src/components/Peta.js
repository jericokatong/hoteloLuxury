import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Polygon, Circle, VideoOverlay, ImageOverlay } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Peta = () => {
  const data = {
    lat: 1.441132071290311,
    lng: 125.15076183574844,
    zoom: 13,
  };
  const position = [data.lat, data.lng];
  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ];

  return (
    <div className="App">
      <MapContainer center={position} zoom={data.zoom} style={{ marginLeft:'130px', width: '880px', height: '500px' }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polygon color="blue" positions={multiPolygon} />
        <Circle center={position} fillColor="blue" radius={200} />
        <VideoOverlay
          bounds={[
            [51.51, -0.12],
            [51.53, -0.07],
          ]}
          url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
        />
        <ImageOverlay
          bounds={[
            [51.51, -0.12],
            [51.53, -0.07],
          ]}
          url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg"
        />
      </MapContainer>
    </div>
  );
};

export default Peta;
