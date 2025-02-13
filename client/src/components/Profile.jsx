import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from './context/AuthContext';
import API_URL from '../utils/configAPI';

export function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`${API_URL}/api/profile/${user.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Non authentifié') {
          navigate('/login');
        } else {
          setProfile(data);
          setValue('nom', data.nom);
          setValue('prenom', data.prenom);
        }
      });
  }, [navigate, setValue, user]);

  const onSubmit = async (formData) => {
    const response = await fetch(`${API_URL}/api/profile/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
    } else {
      alert(result.message);
    }
  };

  if (!profile) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Profil Utilisateur</h2>
      {!isEditing ? (
        <div className="w-80 p-4 border rounded shadow">
          <p><strong>Nom:</strong> {profile.nom}</p>
          <p><strong>Prénom:</strong> {profile.prenom}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button 
            onClick={() => setIsEditing(true)}
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
            Modifier
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-80 p-4 border rounded shadow">
          <input {...register("nom", { required: true })} type="text" className="w-full p-2 mb-2 border rounded" />
          <input {...register("prenom", { required: true })} type="text" className="w-full p-2 mb-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Enregistrer</button>
          <button 
            type="button" 
            onClick={() => setIsEditing(false)}
            className="w-full p-2 mt-2 bg-gray-500 text-white rounded">
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}
