import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './../styles/sidebar.css'

const Sidebar = () => {

    return (
        <nav id="sidebar">
            <ul>
                <>
                    <li><Link to="">Connexion</Link></li>
                    <li><Link to="">Inscription</Link></li>
                </>
            </ul>
        </nav>
    )
}

export default Sidebar