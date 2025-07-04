import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
function emojiToCountryCode(emoji) {
  const codePoints = [...emoji].map(char => char.codePointAt(0) - 127397);
  return String.fromCharCode(...codePoints);
}

function getFlagUrlFromEmoji(emoji) {
  const countryCode = emojiToCountryCode(emoji);
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;
  return (
    <li>
      <Link to={`${id}`} className={styles.cityItem}>
        <span className={styles.emoji}>
        <img
          src={getFlagUrlFromEmoji(emoji)}
          alt={city.country}
          style={{ width: '24px', marginRight: '8px' }}
        />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;