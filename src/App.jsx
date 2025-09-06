import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar'
import ViewPastes from './components/ViewPastes'
import Paste from './components/Pastes'
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const router=createBrowserRouter(
  [
    {path:"/",
      element:<Auth />,

    },
    {path:"/home",
      element:
      <ProtectedRoute>
        <Navbar/>
        <Home/>
        </ProtectedRoute>
    },
    {
      path:"/pastes",
      element:
      <ProtectedRoute>
       <Navbar/>
       <Paste/> 
      </ProtectedRoute>
    },
    {
      path:"/pastes/:id",
      element:
      <ProtectedRoute>
        <Navbar/>
        <ViewPastes/>
      </ProtectedRoute>
    },

  ]
);

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"> 
      <RouterProvider router={router} />
    </div>
  )
}

export default App
