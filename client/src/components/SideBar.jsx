import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './../styles/sidebar.css';
import API_URL from '../utils/configAPI';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/stats`, { method: 'GET', credentials: 'include' })
            .then(res => res.json())
            .then(data => setUserCount(data.total))
            .catch(error => console.error('Erreur récupération du nombre d\'utilisateurs:', error));
    }, []);

    return (
        <nav id="sidebar">
            <ul>
                <li><strong>Utilisateurs inscrits: {userCount}</strong></li>
                {!user ? (
                    <>
                        <li><Link to="/login">Connexion</Link></li>
                        <li><Link to="/register">Inscription</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/profile">Profil</Link></li>
                        <li>
                            <button onClick={logout} className="logout-button">
                                Déconnexion
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Sidebar;
