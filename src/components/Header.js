import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/Logo.png';

const Header = ({ onComodidadesClick, onInicioClick, onMenuClick, paginaAtiva }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <a href="#inicio" className="logo-section" onClick={(e) => { e.preventDefault(); onInicioClick(); setMenuOpen(false); }}>
          <img src={logo} alt="Logo Fazenda" className="logo" />
          <div className="fazenda-name">
            <span className="fazenda-line1">Fazenda Nossa</span>
            <span className="fazenda-line2">Senhora de Fátima</span>
          </div>
        </a>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
          <a 
            href="#home" 
            className={`nav-link ${paginaAtiva === 'home' ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onInicioClick(); setMenuOpen(false); }}
          >
            Home
          </a>
          <a 
            href="#fazenda" 
            className={`nav-link ${paginaAtiva === 'fazenda' ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onMenuClick('fazenda'); setMenuOpen(false); }}
          >
            A Fazenda
          </a>
          <a 
            href="#acomodacoes" 
            className={`nav-link ${paginaAtiva === 'acomodacoes' ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onComodidadesClick(); setMenuOpen(false); }}
          >
            Acomodações
          </a>
          <a 
            href="#lazer" 
            className={`nav-link ${paginaAtiva === 'lazer' ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onMenuClick('lazer'); setMenuOpen(false); }}
          >
            Lazer
          </a>
          <a 
            href="#contato" 
            className={`nav-link ${paginaAtiva === 'contato' ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onMenuClick('contato'); setMenuOpen(false); }}
          >
            Contato
          </a>
          <button className="btn-reservar" onClick={() => { onMenuClick('reserva'); setMenuOpen(false); }}>Reservar</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
