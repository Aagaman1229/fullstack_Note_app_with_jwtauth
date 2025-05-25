import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/protectedRoute"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}
function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/login" 
          element={
            <Login />
          }
        />
        <Route 
          path="/logout" 
          element={
            <Logout />
          }
        />
        <Route 
          path="/register" 
          element={
            <RegisterAndLogout/>
          }
        />
        <Route 
          path="*" 
          element={
            <NotFound/>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
