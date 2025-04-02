import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServerInfo from './components/ServerInfo';
import './App.css';

function App() {
  const [serverData, setServerData] = useState(null);
  const [serverIP, setServerIP] = useState(""); // Guarda o IP ou domínio digitado
  const [numericIP, setNumericIP] = useState(""); // Guarda o IP convertido
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Guarda erros

  const fetchServerData = (ip) => {
    setLoading(true);
    setError("");

    axios.get(`https://api.mcsrvstat.us/2/${ip}`)
      .then(response => {
        if (!response.data || response.data.offline) {
          setError("Servidor offline ou IP inválido.");
          setLoading(false);
          return;
        }

        setServerData(response.data);
        setNumericIP(response.data.ip || ip); // Guarda o IP numérico se tiver
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados do servidor:", error);
        setError("Erro ao buscar servidor.");
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!serverIP) return;

    fetchServerData(serverIP);
  };

  return (
    <div className="container">
      <h1 className="title">🔎 Consulta de Servidor Minecraft</h1>

      {/* Input para digitar o domínio ou IP */}
      <input
        type="text"
        className="input-ip"
        placeholder="Digite o IP ou domínio..."
        value={serverIP}
        onChange={(e) => setServerIP(e.target.value)}
      />
      <button onClick={handleSearch} className="btn-search">Buscar</button>

      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      {serverData && <ServerInfo serverData={serverData} numericIP={numericIP} />}
    </div>
  );
}

export default App;
