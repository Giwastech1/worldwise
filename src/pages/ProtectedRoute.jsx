import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigate();
    useEffect(function () {
        if (!isAuthenticated) {
            navigation("/");
        }
    }, [isAuthenticated])
    return isAuthenticated ? children : null;
}
export default ProtectedRoute;