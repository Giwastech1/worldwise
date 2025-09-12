import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import Button from "./Button";
    
function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParam] = useSearchParams();
    const mapLat = searchParam.get("lat");
    const mapLng = searchParam.get("lng");
    const { cities } = useCities();
    const {
        isLoading: isLoadingPosition,
        position: useGeoLocationPosition,
        getPosition
    } = useGeoLocation();

    useEffect(function () {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng])
        }
    }, [mapLat, mapLng]);
    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition? "Loading...":"Use your position"}
            </Button>
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
function DetectClick() {
    const navigation = useNavigate();
    useMapEvent({
        click: (e) => {
            navigation(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })
}
export default Map;