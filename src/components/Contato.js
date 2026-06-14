import React from 'react';
import './Contato.css';
import { FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Contato = () => {
  return (
    <div className="contato-page">
      <div className="contato-container">
        <h1 className="contato-title">Entre em Contato</h1>
        <p className="contato-intro">
          Estamos prontos para ajudá-lo a planejar sua estadia perfeita na Fazenda Nossa Senhora de Fátima. 
          Entre em contato conosco para reservas, informações ou qualquer dúvida.
        </p>

        <div className="contato-cards">
          <a href="https://wa.me/5521993162943" target="_blank" rel="noopener noreferrer" className="contato-card">
            <div className="contato-icon-wrapper">
              <FaWhatsapp className="contato-icon" />
            </div>
            <h3 className="contato-card-title">WhatsApp</h3>
            <p className="contato-card-info">(21) 99316-2943</p>
            <span className="contato-card-action">Fale conosco agora</span>
          </a>

          <a href="mailto:contato@fazendansradefatima.com.br" className="contato-card">
            <div className="contato-icon-wrapper">
              <FaEnvelope className="contato-icon" />
            </div>
            <h3 className="contato-card-title">E-mail</h3>
            <p className="contato-card-info">contato@fazendansradefatima.com.br</p>
            <span className="contato-card-action">Envie uma mensagem</span>
          </a>

          <a href="https://www.instagram.com/fazendansradefatima/?hl=en" target="_blank" rel="noopener noreferrer" className="contato-card">
            <div className="contato-icon-wrapper">
              <FaInstagram className="contato-icon" />
            </div>
            <h3 className="contato-card-title">Instagram</h3>
            <p className="contato-card-info">@fazendansradefatima</p>
            <span className="contato-card-action">Siga-nos</span>
          </a>
        </div>

        <div className="contato-mapa">
          <h2 className="contato-subtitle">Nossa Localização</h2>
          <div className="mapa-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d397459.2006604816!2d-43.43322448630102!3d-22.252729724760645!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x98ff7f93929f75%3A0x72af606c3db51b43!2sFazenda%20Nossa%20Senhora%20de%20F%C3%A1tima!5e0!3m2!1spt-BR!2sbr!4v1780099923182!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Fazenda Nossa Senhora de Fátima"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
