import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Login } from "./components/Login";
import { LayoutModule } from "./modules/layout";
import { BookModule } from "./modules/book";
import { UserModule } from "./modules/user";
import { BorrowModule } from "./modules/borrow";
import { MemberModule } from "./modules/member";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <LayoutModule />
            ) : (
              <Navigate to="/ingresar" replace={true} />
            )
          }
        />
        <Route path="/ingresar" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="usuarios" element={<UserModule />} />
            <Route path="socios" element={<MemberModule />} />
            <Route path="libros" element={<BookModule />} />
            <Route path="prestamos" element={<BorrowModule />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default App;