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
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="users" element={<UserModule />} />
            <Route path="members" element={<MemberModule />} />
            <Route path="books" element={<BookModule />} />
            <Route path="borrows" element={<BorrowModule />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default App;