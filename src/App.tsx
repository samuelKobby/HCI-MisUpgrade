import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? 
            <Dashboard onLogout={() => setIsLoggedIn(false)} /> : 
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard onLogout={() => setIsLoggedIn(false)} />} 
        />
      </Routes>
    </div>
  )
}

export default App