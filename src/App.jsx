import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loginpage from "./pages/LoginPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import InvoiceListPage from "./pages/InvoiceListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/invoices" element={<InvoiceListPage />}></Route>
        <Route path="/invoices/:id" element={<InvoiceDetailPage />}></Route>
        <Route path="*" element={<Navigate to="/login" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;