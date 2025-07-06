import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
    const [searchParam, setSearchParam] = useSearchParams();
    const lat = searchParam.get("lat");
    const lng = searchParam.get("lng");
    return (
        <div className={styles.mapContainer}>
            <h2>Map</h2>
            <h2>Position:{lat}, {lng}</h2>
            <button onClick={() => setSearchParam({
                lat: 29, lng: 100
            })}>Change pos</button>
        </div>
    );
}
export default Map;