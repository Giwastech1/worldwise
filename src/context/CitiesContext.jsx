import { createContext, useEffect, useState } from "react";
const Base_URL = "http://localhost:9000"
const citiesContext = createContext();
function CityProvider({children}) {
    const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    useEffect(function () {
        async function getCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${Base_URL}/cities`);
                const data = await response.json();
                setCities(data);
            }
            catch {
                alert("Error occured while fetching data");
            }
            setIsLoading(false);
        }
        getCities();
    }, [])
    return (
        <citiesContext.Provider value={{
            cities,
            isLoading
        }}>
            {children}
        </citiesContext.Provider>
    );
}
export { CityProvider };