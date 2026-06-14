import React from 'react';
import './AFazendaPage.css';

const AFazendaPage = () => {
  return (
    <div className="afazenda-page">
      <div className="afazenda-hero">
        <h1>A Fazenda</h1>
      </div>

      <div className="afazenda-container">
        <section className="intro-section">
          <p className="intro-text">
            Localizada em uma das áreas mais privilegiadas de Secretário, a fazenda une o charme da vida na serra com conforto, privacidade e uma estrutura completa para receber bem. Cercada por natureza, com vista privilegiada para a Maria Comprida e sem vizinhos próximos, a propriedade foi pensada para quem busca descanso, lazer e momentos especiais em família ou entre amigos.
          </p>
          <p className="intro-text">
            A casa conta com ambientes amplos, sala de TV, sala com lareira, jardim de inverno, cozinha equipada, quartos confortáveis e áreas recém-reformadas. Com 7 quartos, sendo 5 suítes, a fazenda pode acomodar até 28 hóspedes com conforto, mas também atende muito bem famílias e grupos menores que desejam aproveitar a propriedade com mais privacidade.
          </p>
          <p className="intro-text">
            Para completar a experiência, a fazenda oferece piscina aquecida, jacuzzi, sauna, área gourmet, salão de jogos, quadra de areia, campo de futebol e contato com cavalos. A cozinha é totalmente equipada e há possibilidade de contratação de serviço de cozinheira e auxiliar, oferecendo ainda mais comodidade durante a estadia.
          </p>
        </section>

        <section className="info-section">
          <h2>Localização</h2>
          <div className="info-lista">
            <div className="info-item">
              <span className="info-bullet">•</span>
              <span className="info-texto">Em Secretário, Petrópolis/RJ</span>
            </div>
            <div className="info-item">
              <span className="info-bullet">•</span>
              <span className="info-texto">Aproximadamente 100 km da Zona Sul do Rio de Janeiro</span>
            </div>
            <div className="info-item">
              <span className="info-bullet">•</span>
              <span className="info-texto">Cerca de 1h40 sem trânsito da Zona Sul do Rio de Janeiro</span>
            </div>
            <div className="info-item">
              <span className="info-bullet">•</span>
              <span className="info-texto">Área nobre e tranquila</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AFazendaPage;
