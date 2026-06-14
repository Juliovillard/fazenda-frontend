import React from 'react';
import './AFazenda.css';

const AFazenda = () => {
  return (
    <section id="fazenda" className="fazenda-section">
      <div className="fazenda-container">
        <h1 className="fazenda-title">Recarregue as suas energias<br />em nossa fazenda.</h1>
        <div className="fazenda-divider"></div>
        
        <div className="fazenda-content">
          <div>
            <p className="fazenda-text">
              Possuímos mais de <strong>300.000m²</strong> de área total contando com vasta área de pasto, 
              área de plantio, curral e galinheiro.
            </p>
            
            <p className="fazenda-text" style={{marginTop: '1.5rem'}}>
              Sede composta por excelente área de lazer, contando com <strong>piscina, sauna, churrasqueira, 
              fogão e dois fornos a lenha</strong>, casa principal com varandão, sala de estar em três ambientes 
              com lareira, sala de jantar, jardim de inverno, lavabo, duas suítes, dois quartos, banheiro social, 
              cozinha com fogão industrial, bancada armários e dispensa e área de serviço.
            </p>
          </div>
          
          <div>
            <p className="fazenda-text">
              Possui também <strong>três suítes externas</strong> totalmente independentes, mas muito próximo 
              da casa principal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AFazenda;
