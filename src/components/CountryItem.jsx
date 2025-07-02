import styles from "./CountryItem.module.css";
function emojiToCountryCode(emoji) {
  const codePoints = [...emoji].map(char => char.codePointAt(0) - 127397);
  return String.fromCharCode(...codePoints);
}

function getFlagUrlFromEmoji(emoji) {
  const countryCode = emojiToCountryCode(emoji);
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

function CountryItem({ country }) {
  const { emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>
        <img src={getFlagUrlFromEmoji(emoji)} alt={country.country}
          style={{ width: '24px', marginRight: '8px' }} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
