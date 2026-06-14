import React, { useState } from 'react';
import './Lazer.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import jantar1 from '../images/Área de Jantar/1.avif';
import jantar2 from '../images/Área de Jantar/2.avif';
import jantar3 from '../images/Área de Jantar/3.avif';
import piscina1 from '../images/Piscina/1.avif';
import piscina2 from '../images/Piscina/2.avif';
import piscina3 from '../images/Piscina/3.avif';
import piscina5 from '../images/Piscina/5.avif';
import jacuzzi1 from '../images/Jacuzzi/1.avif';
import jacuzzi2 from '../images/Jacuzzi/2.avif';
import quintal2 from '../images/Quintal/2.avif';
import quintal3 from '../images/Quintal/3.avif';
import exterior1 from '../images/Exterior/1.avif';
import exterior2 from '../images/Exterior/2.avif';
import exterior3 from '../images/Exterior/3.avif';
import exterior4 from '../images/Exterior/4.avif';

const Lazer = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentAmbiente, setCurrentAmbiente] = useState([]);

  const areasLazer = [
    { 
      nome: 'Área de Jantar', 
      fotos: [jantar1, jantar2, jantar3],
      descricao: 'Espaço perfeito para reuniões'
    },
    { 
      nome: 'Piscina', 
      fotos: [piscina1, piscina2, piscina3, piscina5],
      descricao: 'Piscina aquecida para momentos de lazer'
    },
    { 
      nome: 'Jacuzzi', 
      fotos: [jacuzzi1, jacuzzi2],
      descricao: 'Relaxamento e conforto'
    },
    { 
      nome: 'Quintal', 
      fotos: [quintal2, quintal3],
      descricao: 'Área externa ampla e arborizada'
    },
    { 
      nome: 'Exterior', 
      fotos: [exterior1, exterior2, exterior3, exterior4],
      descricao: 'Vista externa da propriedade'
    }
  ];

  const openLightbox = (fotos, index) => {
    setCurrentAmbiente(fotos.map(foto => ({ src: foto })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true
  };

  return (
    <section className="lazer-section">
      <div className="lazer-container">
        <h2 className="lazer-title">Lazer e Conforto</h2>
        
        <div className="lazer-lista">
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Piscina aquecida</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Jacuzzi / spa</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Sauna</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Área gourmet com churrasqueira e forno de pizza</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Salão de jogos com sinuca</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Quadra de areia</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Campo de futebol</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Cavalos na propriedade</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Jardim de inverno</span>
          </div>
          <div className="lazer-item">
            <span className="lazer-bullet">•</span>
            <span className="lazer-texto">Sala de lareira</span>
          </div>
        </div>

        <div className="lazer-grid">
          {areasLazer.map((area, index) => (
            <div key={index} className="lazer-card">
              <div className="lazer-carousel">
                <Slider {...settings}>
                  {area.fotos.map((foto, fotoIndex) => (
                    <div key={fotoIndex} className="slide-item">
                      <img 
                        src={foto} 
                        alt={`${area.nome} - ${fotoIndex + 1}`} 
                        className="lazer-img"
                        onClick={() => openLightbox(area.fotos, fotoIndex)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="lazer-info">
                <h3 className="lazer-nome">{area.nome}</h3>
                <p className="lazer-descricao">{area.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={currentAmbiente}
        index={lightboxIndex}
      />
    </section>
  );
};

export default Lazer;
