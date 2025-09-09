import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
function Map() {
    const [mapPosition, setMapPosition] = useState([40,0]);
    const navigation = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const lat = searchParam.get("lat");
    const lng = searchParam.get("lng");
    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className={styles.map} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
export default Map;