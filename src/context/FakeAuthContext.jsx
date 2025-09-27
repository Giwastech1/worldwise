import { createContext, useContext, useReducer } from "react";

const authContext = createContext();
const initialState = {
    user: null,
    isAuthenticated: false
};
function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, isAuthenticated: true, user: action.payload };
        case "logout":
            return { ...state, isAuthenticated: false, user: action.payload };
        default:
            throw new Error("Action unknown");
    }
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};
  

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isAuthenticated } = state;
    function login(email, password) {
        const isPassedAuth = email === FAKE_USER.email && password === FAKE_USER.password;
        if (isPassedAuth) {
            dispatch({ type: "login", payload: FAKE_USER});
        }
    }
    function logout() {
        dispatch({ type: "logout" });
    }
    return (
        <authContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }
        }>
            {children}
        </authContext.Provider>
    );
}
function useAuth() {
    const context = useContext(authContext);
    if (context === null) {
        throw new Error("context was use oustide the AuthProvider")
    }
    return context;
}
export { AuthProvider, useAuth };