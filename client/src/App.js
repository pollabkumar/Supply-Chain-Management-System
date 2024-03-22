import "antd/dist/antd.min.css"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Allpage from "./pages/Allpage";
import BillsPage from "./pages/BillsPage";
import DistributorPage from "./pages/DistributorPage";
import Login from "./pages/Login";
import Manufacturer from "./pages/Manufacturer";
import Register from "./pages/Register";
import Retailer from "./pages/Retailer";
import ShowPage from "./pages/ShowPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/bills" element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          } />
          <Route exact path="/show" element={
            <ProtectedRoute>
              <ShowPage />
            </ProtectedRoute>
          } />

          <Route exact path="/menuf" element={
            <ProtectedRoute>
              <Manufacturer />
            </ProtectedRoute>
          } />

          <Route exact path="/distributor" element={
            <ProtectedRoute>
              <DistributorPage />
            </ProtectedRoute>
          } />

          <Route exact path="/re" element={
            <ProtectedRoute>
              <Retailer />
            </ProtectedRoute>
          } />
          <Route exact path="/all" element={
            <ProtectedRoute>
              <Allpage />
            </ProtectedRoute>
          } />


          
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login"/>;
  }
}
