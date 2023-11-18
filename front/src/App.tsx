import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Login } from "./components/Login";
import { LayoutModule } from "./modules/layout";
import { BookModule } from "./modules/book";
import { UserModule } from "./modules/user";
import { BorrowModule } from "./modules/borrow";
import { MemberModule } from "./modules/member";
import { localStorage } from "./services";
//import { IResponse } from "./services/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string }>({
    name: "",
    role: "",
  });

  useEffect(() => {
    const storedLoginStatus = localStorage.getLoggedIn();
    const data = localStorage.get();
    if (storedLoginStatus && data) {
      setIsLoggedIn(true);
      setUser(data.user || { name: "", role: "" });
    }
  }, []);

  const handleLogin = (
    loggedIn: boolean,
    user: { name: string; role: string } | undefined
  ) => {
    setIsLoggedIn(loggedIn);
    localStorage.setLoggedIn(loggedIn.toString());
    if (user) {
      setUser(user);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <LayoutModule userRole={user?.role} />
            ) : (
              <Navigate to="/ingresar" replace={true} />
            )
          }
        />
        <Route path="/ingresar" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            {user?.role === "admin" && (
              <>
                <Route path="/usuarios" element={<UserModule />} />
                <Route path="/socios" element={<MemberModule />} />
                <Route path="/libros" element={<BookModule />} />
                <Route path="/prestamos" element={<BorrowModule />} />
              </>
            )}

            {user?.role === "employee" && (
              <>
                <Route path="/libros" element={<BookModule />} />
                <Route path="/prestamos" element={<BorrowModule />} />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
