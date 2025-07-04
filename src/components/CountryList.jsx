import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if (cities.length === 0) return <Message message="you don't have any city on the list, start by clicking a city on the map" />
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) 
            return[...arr,{emoji:city.emoji,country:city.country}]
        
        else {
            return arr;
        }
    },[])
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => <CountryItem country={country} />)}
        </ul>
    );
}
export default CountryList;