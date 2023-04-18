import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInSignUpCustomer from "./loginSignUpCustomer";
import LogInSignUpRestaurant from "./loginSignUpRestaurant";
import AllRestaurants from "./dashboard";
import MenuTable from "./MenuTable";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllRestaurants />} />
          <Route path="/menu" element={<MenuTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
