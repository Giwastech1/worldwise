import { createContext, useContext, useEffect, useReducer} from "react";
const Base_URL = "http://localhost:9000"
const citiesContext = createContext();
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error:""
}
function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            };
        case "city/loaded":
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload]
            };
            
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload)
            };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error("unknown action");
    }
}

function CityProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoading, cities, currentCity } = state;
    //const [cities, setCities] = useState([]);
   // const [isLoading, setIsLoading] = useState(false);
    //const [currentCity, setCurrentCity] = useState({});
    useEffect(function () {
        async function getCities() {
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${Base_URL}/cities`);
                const data = await response.json();
                dispatch({ type: "cities/loaded", payload: data });
            }
            catch {
                dispatch({
                    type: "rejected",
                    payload: "Error occured while fetching cities"
                });
            }
        }
        getCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${Base_URL}/cities/${id}`);
            const data = await response.json();
            dispatch({ type: "city/loaded", payload: data });
        }
        catch {
            dispatch({
                type: "rejected",
                payload: "Error occured while loading city"
            });
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${Base_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            {/* setCities((cities) => [...cities, data]); */ }
            dispatch({ type: "city/created", payload: data });
        }
        catch {
            dispatch({
                type: "rejected",
                payload: "Error occured while creating city"
            });
        }
    } 
    async function handleDeleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${Base_URL}/cities/${id}`, {
                method: "DELETE"
            });
            {/* setCities((cities) => cities.filter((city) => city.id !== id)); */ }
            dispatch({ type: "city/deleted", payload: id });
        }
        catch {
            dispatch({
                type: "rejected",
                payload: "Error occured while deleting city"
            });
        }
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