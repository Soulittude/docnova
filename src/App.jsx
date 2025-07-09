import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loginpage from "./pages/LoginPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import InvoiceListPage from "./pages/InvoiceListPage";

function PrivateRoot({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <InvoiceListPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/invoices/:id"
          element={
            <PrivateRoute>
              <InvoiceDetailPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/login" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
