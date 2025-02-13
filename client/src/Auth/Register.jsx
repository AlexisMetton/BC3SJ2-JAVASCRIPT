import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import API_URL from '../utils/configAPI';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        alert(result.message);
      }
    };
  
    return (
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-80 p-4 border rounded shadow">
          <input {...register("nom", { required: true })} type="text" placeholder="Nom" className="w-full p-2 mb-2 border rounded" />
          <input {...register("prenom", { required: true })} type="text" placeholder="Prénom" className="w-full p-2 mb-2 border rounded" />
          <input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
          <input {...register("mot_de_passe", { required: true })} type="password" placeholder="Mot de passe" className="w-full p-2 mb-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">S'inscrire</button>
        </form>
      </div>
    );
  }

  export default Register;