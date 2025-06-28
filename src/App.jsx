import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pricing from "./pages/pricing";
import Product from "./pages/product";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
const Base_URL = "http://localhost:9000"
function App() {
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
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities}isLoading={isLoading} />} />
          <Route path="countries" element={<p>countries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;