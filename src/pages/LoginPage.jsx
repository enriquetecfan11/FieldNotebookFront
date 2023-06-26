import { useState } from 'react';
import util from '../utils/util.js';

function LoginPage({ handleLogin, setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    fetch(util.getUsuarios())
      .then((response) => response.json())
      .then((data) => {
        const usuario = data.find(
          (usuario) =>
            usuario.email === username && usuario.password === password
        );

        console.log('username', username, 'password', password);

        if (usuario) {
          handleLogin(usuario);
          setAuthenticated(true);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del personal:', error);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Bienvenido al Cuaderno de Campo
      </h2>
      <div className="bg-white rounded-lg p-8 shadow">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Usuario"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Contraseña"
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleTogglePassword}
          />{' '}
          Mostrar contraseña
        </label>
        <button
          onClick={handleLoginClick}
          className="w-full bg-meta-3 text-whiter py-2 px-4 rounded hover:bg-success-600"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
