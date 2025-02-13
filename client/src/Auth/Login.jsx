import { useForm } from 'react-hook-form';
import { useAuth } from '../components/context/AuthContext';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
  
    const onSubmit = async (data) => {
      await login(data);
    };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 p-4 border rounded shadow">
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
        <input {...register("mot_de_passe", { required: true })} type="password" placeholder="Mot de passe" className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;