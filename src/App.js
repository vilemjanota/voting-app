import './styles/App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateSession from './pages/CreateSession'
import Session from './pages/Session'
import NotFound from './pages/NotFound'
import { WebSocketProvider } from './WebSocketContext'

function App() {
    return (
        <WebSocketProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/'
                    element={
                        <Home />
                    }
                />
                <Route path='/create-session'
                    element={
                        <CreateSession />
                    }
                />
                <Route path='/session'
                    element={
                        <Session />
                    }
                />
                <Route path='*'
                    element={
                        <NotFound />
                    }
                />
            </Routes>
        </BrowserRouter>
        </WebSocketProvider>
    )
}

export default App
