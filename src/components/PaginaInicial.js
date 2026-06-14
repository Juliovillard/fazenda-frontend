import React, { useState } from 'react';
import './PaginaInicial.css';
import { FaWifi, FaCar, FaDog, FaHotTub, FaFire, FaUsers, FaBed, FaUtensils } from 'react-icons/fa';
import { MdWork, MdPool } from 'react-icons/md';
import { GiWoodCabin, GiBarbecue } from 'react-icons/gi';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import grid1 from '../images/Grid/1.jpg';
import grid2 from '../images/Grid/2.jpg';
import grid3 from '../images/Grid/3.jpg';
import grid4 from '../images/Grid/4.jpg';
import grid5 from '../images/Grid/5.jpg';

const PaginaInicial = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galeriaFotos = [
    { src: grid1, alt: 'Fazenda' },
    { src: grid2, alt: 'Fazenda' },
    { src: grid3, alt: 'Fazenda' },
    { src: grid4, alt: 'Fazenda' },
    { src: grid5, alt: 'Fazenda' }
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const comodidades = [
    { icon: <FaWifi />, nome: 'Wi-Fi Gratuito' },
    { icon: <MdPool />, nome: 'Piscina Privativa' },
    { icon: <FaHotTub />, nome: 'Jacuzzi' },
    { icon: <FaFire />, nome: 'Sauna' },
    { icon: <GiBarbecue />, nome: 'Churrasqueira' },
    { icon: <FaUtensils />, nome: 'Cozinha Completa' },
    { icon: <FaCar />, nome: 'Estacionamento' },
    { icon: <MdWork />, nome: 'Espaço de Trabalho' },
    { icon: <FaDog />, nome: 'Pet Friendly' },
    { icon: <GiWoodCabin />, nome: 'Área Rural' }
  ];

  return (
    <div className="pagina-inicial">
      {/* Seção Sobre */}
      <section className="sobre-section">
        <div className="sobre-container">
          <h2 className="section-title">Bem-vindo à Fazenda Nossa Senhora de Fátima</h2>
          <p className="sobre-descricao">
            A Fazenda Nossa Senhora de Fátima é um refúgio encantador em meio à natureza, 
            perfeito para quem busca tranquilidade, conforto e momentos inesquecíveis. 
            Com mais de 300.000m² de área total, oferecemos amplo espaço verde, pasto, 
            área de plantio, curral e galinheiro.
          </p>

        </div>
      </section>

      {/* Seção O que temos de melhor */}
      <section className="espacos-section">
        <div className="espacos-container">
          <h2 className="section-title">O que temos de melhor</h2>
          
          <div className="espacos-grid">
            {/* A Fazenda */}
            <div className="espaco-card" onClick={() => openLightbox(0)}>
              <img src={grid1} alt="A Fazenda" />
              <div className="espaco-overlay">
                <h3 className="espaco-card-titulo">A Fazenda</h3>
              </div>
            </div>

            {/* Lazer */}
            <div className="espaco-card" onClick={() => openLightbox(1)}>
              <img src={grid2} alt="Lazer" />
              <div className="espaco-overlay">
                <h3 className="espaco-card-titulo">Lazer</h3>
              </div>
            </div>

            {/* Acomodações */}
            <div className="espaco-card" onClick={() => openLightbox(2)}>
              <img src={grid3} alt="Acomodações" />
              <div className="espaco-overlay">
                <h3 className="espaco-card-titulo">Acomodações</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="estrutura-section">
        <div className="estrutura-container">
          <h2 className="section-title">Nossa Estrutura</h2>
          <div className="estrutura-content">
            <p>
              A sede possui uma excelente estrutura de lazer, com piscina, sauna, churrasqueira, 
              fogão e fornos a lenha, além de uma casa principal aconchegante com varandão, lareira, 
              suítes, quartos, cozinha completa e áreas integradas.
            </p>
            <p>
              O imóvel também dispõe de suítes externas independentes, garantindo conforto, 
              privacidade e uma experiência única em meio à natureza. Perfeito para famílias, 
              grupos de amigos ou eventos especiais.
            </p>
          </div>
        </div>
      </section>

      {/* Comodidades */}
      <section className="comodidades-section-home">
        <div className="comodidades-container-home">
          <h2 className="section-title">Comodidades</h2>
          <div className="comodidades-grid-home">
            {comodidades.map((item, index) => (
              <div key={index} className="comodidade-item-home">
                <div className="comodidade-icon-home">{item.icon}</div>
                <span className="comodidade-nome-home">{item.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="localizacao-section">
        <div className="localizacao-container">
          <h2 className="section-title">Localização Privilegiada</h2>
          <p className="localizacao-texto">
            Localizada em uma região tranquila e de fácil acesso, a Fazenda Nossa Senhora de Fátima 
            oferece o equilíbrio perfeito entre natureza e comodidade. Um lugar ideal para relaxar, 
            reconectar-se com a natureza e criar memórias especiais.
          </p>
          <div className="mapa-container">
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
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={galeriaFotos}
        index={lightboxIndex}
      />
    </div>
  );
};

export default PaginaInicial;
