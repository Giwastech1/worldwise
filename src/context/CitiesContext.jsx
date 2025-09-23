import { createContext, useContext, useEffect, useState } from "react";
const Base_URL = "http://localhost:9000"
const citiesContext = createContext();
function CityProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
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
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        }
        catch {
            alert("Error occured while fetching data");
        }
        setIsLoading(false);
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setCities((cities)=>[...cities, data]);
        }
        catch {
            alert("Error occured while fetching data");
        }
        setIsLoading(false);
    } 
    async function handleDeleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${Base_URL}/cities/${id}`, {
                method: "DELETE"
            });
            setCities((cities) => cities.filter((city) => city.id !== id));
        }
        catch {
            alert("Error occured while deleting city");
        }
        setIsLoading(false);
    } 
    return (
        <citiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            handleDeleteCity
        }}>
            {children}
        </citiesContext.Provider>
    );
}
function useCities() {
    const context = useContext(citiesContext);
    if (context === undefined) {
        throw new Error("citiesContext was used outsite the CityProvider");
    }
    return context;
}
export { CityProvider, useCities};