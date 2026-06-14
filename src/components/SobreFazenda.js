import React from 'react';
import './SobreFazenda.css';
import grid1 from '../images/Grid/1.jpg';
import grid2 from '../images/Grid/2.jpg';
import grid3 from '../images/Grid/3.jpg';
import grid4 from '../images/Grid/4.jpg';
import grid5 from '../images/Grid/5.jpg';

const SobreFazenda = () => {
  const handleVerMais = () => {
    window.location.href = '#galeria';
  };

  return (
    <section className="sobre-fazenda-section">
      <div className="sobre-fazenda-container">
        <div className="sobre-imagens">
          <img src={grid1} alt="Fazenda" className="img-principal" />
          <div className="sobre-imagens-bottom">
            <img src={grid2} alt="Fazenda" />
            <img src={grid3} alt="Fazenda" />
            <img src={grid4} alt="Fazenda" />
            <div className="img-ver-mais" onClick={handleVerMais}>
              <img src={grid5} alt="Fazenda" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreFazenda;
