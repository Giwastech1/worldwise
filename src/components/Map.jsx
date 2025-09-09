import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";
function Map() {
    const [mapPosition, setMapPosition] = useState([40,0]);
    const navigation = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const lat = searchParam.get("lat");
    const lng = searchParam.get("lng");
    const { cities } = useCities();
    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => <Marker position={[city.position.lat, city.position.lng]}>
                    <Popup>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>)}
            </MapContainer>
        </div>
    );
}
export default Map;