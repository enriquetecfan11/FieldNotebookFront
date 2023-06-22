import { useState } from 'react';

function LoginPage({ handleLogin, setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username === 'demo' && password === 'clavedemo') {
      handleLogin();
      setAuthenticated(true);
    } else {
      console.log('Credenciales incorrectas');
      alert('Clave Incorrecta');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">Bienvenido al Cuaderno de Campo</h2>
      <div className="bg-white rounded-lg p-8 shadow">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Contraseña"
        />
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
