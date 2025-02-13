import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Template from './components/Template.jsx'
import AddBook from './components/AddABook'
import BookDetails from './components/BookDetails'
import EditBook from './components/EditBook'
import BookList from './components/BookList.jsx'
import './style.css'
import Login from './Auth/Login.jsx'
import Register from './Auth/Register.jsx'
import { Profile } from './components/Profile.jsx'
import { AuthProvider, ProtectedRoute } from './components/context/AuthContext.jsx'

function App() {
    return (

            <Router>
                        <AuthProvider>
                <Routes>
                    <Route path="/" element={<Template><BookList /></Template>} />
                    <Route path="/login" element={<Template><Login/></Template>} />
                    <Route path="/register" element={<Template><Register /></Template>} />
                    <Route path="/profile" element={<ProtectedRoute><Template><Profile /></Template></ProtectedRoute>} />
                    <Route path="/books" element={<Template><BookList /></Template>} />
                    <Route path="/add_book" element={<Template page="Ajout d'un livre"><AddBook /></Template>} />
                    <Route path="/book/:bookId" element={<Template page="Détail du livre"><BookDetails /></Template>} />
                    <Route path="/edit_book/:bookId" element={<Template page="Édition du livre"><EditBook /></Template>} />
                </Routes>
                </AuthProvider>
            </Router>

    );
}

export default App