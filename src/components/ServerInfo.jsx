import React from 'react';
import './ServerInfo.css';

const ServerInfo = ({ serverData, numericIP }) => {
  return (
    <div className="server-card">
      <h2>{serverData?.hostname || "Servidor Desconhecido"}</h2>
      <p>🔢 IP Numérico: {numericIP}</p>
      <p>🎮 Jogadores Online: {serverData?.players?.online || 0}</p>
      <p>⚙️ Versão: {serverData?.version || "Não informado"}</p>

      {/* Exibe o ícone do servidor, se existir */}
      {serverData?.icon && (
        <img src={serverData.icon} alt="Ícone do servidor" className="server-icon" />
      )}
    </div>
  );
};

export default ServerInfo;
