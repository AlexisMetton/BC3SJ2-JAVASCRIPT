import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Template from './components/Template.jsx'
import AddBook from './components/AddABook'
import BookDetails from './components/BookDetails'
import EditBook from './components/EditBook'
import BookList from './components/BookList.jsx'
import './style.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Template><BookList /></Template>} />
                <Route path="/books" element={<Template><BookList /></Template>} />
                <Route path="/add_book" element={<Template page="Ajout d'un livre"><AddBook /></Template>} />
                <Route path="/book/:bookId" element={<Template page="Détail du livre"><BookDetails /></Template>} />
                <Route path="/edit_book/:bookId" element={<Template page="Édition du livre"><EditBook /></Template>} />
            </Routes>
        </Router>
    );
}

export default App