import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesContext";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  const Base_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity } = useCities();
  const navigation = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position:{lat,lng}
    }
    createCity(newCity);
    navigation(-1);
  }
  useEffect(function () {
    async function getCityData() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");
        const response = await fetch(`${Base_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await response.json();
        if (!data.city) {
          throw new Error("There is no a city there, click other part of the map 😀")
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getCityData();
  }, [lat, lng])
  if (geoCodingError) {
    return <Message message={geoCodingError}/>
  }
  if (isLoadingGeoCoding) {
    return <Spinner />
  }
  if(!lat && !lng) return <Message message="Start by clicking a part of the map 😀"/>
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(e)=>setDate(e)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;