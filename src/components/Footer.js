import React from 'react';
import './Footer.css';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logo from '../images/Logo.png';

const Footer = ({ onMenuClick }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo e Descrição */}
          <div className="footer-section">
            <img src={logo} alt="Fazenda Nossa Senhora de Fátima" className="footer-logo" />
            <h3 className="footer-title">Fazenda Nossa Senhora de Fátima</h3>
            <p className="footer-description">
              Um refúgio encantador em meio à natureza, perfeito para momentos inesquecíveis.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="footer-section">
            <h4 className="footer-section-title">Links Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onMenuClick('home'); }}>Home</a></li>
              <li><a href="#fazenda" onClick={(e) => { e.preventDefault(); onMenuClick('fazenda'); }}>A Fazenda</a></li>
              <li><a href="#acomodacoes" onClick={(e) => { e.preventDefault(); onMenuClick('acomodacoes'); }}>Acomodações</a></li>
              <li><a href="#lazer" onClick={(e) => { e.preventDefault(); onMenuClick('lazer'); }}>Lazer</a></li>
              <li><a href="#contato" onClick={(e) => { e.preventDefault(); onMenuClick('contato'); }}>Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-section">
            <h4 className="footer-section-title">Contato</h4>
            <div className="footer-contact">
              <a href="https://wa.me/5521993162943" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <FaWhatsapp className="footer-icon" />
                <span>(21) 99316-2943</span>
              </a>
              <a href="mailto:contato@fazendansradefatima.com.br" className="footer-contact-item">
                <FaEnvelope className="footer-icon" />
                <span>contato@fazendansradefatima.com.br</span>
              </a>

            </div>
          </div>

          {/* Redes Sociais */}
          <div className="footer-section">
            <h4 className="footer-section-title">Redes Sociais</h4>
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/fazendansradefatima/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/5521993162943" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 Fazenda Nossa Senhora de Fátima. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
