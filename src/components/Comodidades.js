import React, { useState } from 'react';
import './Comodidades.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Importar todas as imagens
import quarto1_1 from '../images/Quarto 1/1.avif';
import quarto1_2 from '../images/Quarto 1/2.avif';
import quarto2_1 from '../images/Quarto 2/1.avif';
import quarto2_2 from '../images/Quarto 2/2.avif';
import quarto3_1 from '../images/Quarto 3/1.avif';
import quarto3_2 from '../images/Quarto 3/2.avif';
import quarto4_1 from '../images/Quarto 4/1.avif';
import quarto4_2 from '../images/Quarto 4/2.avif';
import quarto4_3 from '../images/Quarto 4/3.avif';
import quarto5_1 from '../images/Quarto 5/1.avif';
import quarto6_1 from '../images/Quarto 6/1.avif';
import quarto7_1 from '../images/Quarto 7/1.avif';
import quarto7_2 from '../images/Quarto 7/2.avif';
import quarto7_3 from '../images/Quarto 7/3.avif';
import sala1 from '../images/Sala de Estar/1.avif';
import sala2 from '../images/Sala de Estar/2.avif';
import sala3 from '../images/Sala de Estar/3.avif';
import sala4 from '../images/Sala de Estar/4.avif';
import sala5 from '../images/Sala de Estar/5.avif';
import jogos1 from '../images/Sala de jogos/1.avif';
import jogos2 from '../images/Sala de jogos/2.avif';
import cozinha1 from '../images/Cozinha Completa/1.avif';
import cozinha2 from '../images/Cozinha Completa/2.avif';
import garagem1 from '../images/Garagem/1.avif';
import garagem2 from '../images/Garagem/2.avif';

const Comodidades = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentAmbiente, setCurrentAmbiente] = useState([]);

  const ambientes = [
    { 
      nome: 'Quarto 1', 
      fotos: [quarto1_1, quarto1_2],
      descricao: 'Quarto aconchegante e confortável'
    },
    { 
      nome: 'Quarto 2', 
      fotos: [quarto2_1, quarto2_2],
      descricao: 'Ambiente tranquilo e relaxante'
    },
    { 
      nome: 'Quarto 3', 
      fotos: [quarto3_1, quarto3_2],
      descricao: 'Espaço amplo e bem iluminado'
    },
    { 
      nome: 'Quarto 4', 
      fotos: [quarto4_1, quarto4_2, quarto4_3],
      descricao: 'Quarto espaçoso com vista privilegiada'
    },
    { 
      nome: 'Quarto 5', 
      fotos: [quarto5_1],
      descricao: 'Aconchego e privacidade'
    },
    { 
      nome: 'Quarto 6', 
      fotos: [quarto6_1],
      descricao: 'Ambiente acolhedor'
    },
    { 
      nome: 'Quarto 7', 
      fotos: [quarto7_1, quarto7_2, quarto7_3],
      descricao: 'Suíte completa e confortável'
    },
    { 
      nome: 'Sala de Estar', 
      fotos: [sala1, sala2, sala3, sala4, sala5],
      descricao: 'Espaço de convivência e lazer'
    },
    { 
      nome: 'Sala de Jogos', 
      fotos: [jogos1, jogos2],
      descricao: 'Diversão garantida para toda família'
    },
    { 
      nome: 'Cozinha Completa', 
      fotos: [cozinha1, cozinha2],
      descricao: 'Totalmente equipada para suas refeições'
    },
    { 
      nome: 'Garagem', 
      fotos: [garagem1, garagem2],
      descricao: 'Estacionamento coberto e seguro'
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
    <section className="comodidades-section">
      <div className="comodidades-container">
        <h2 className="comodidades-title">Acomodações</h2>
        <p className="comodidades-intro">
          Conheça nossos espaços cuidadosamente preparados para proporcionar conforto e bem-estar durante sua estadia.
        </p>

        <div className="estrutura-info">
          <h3 className="estrutura-title">Estrutura</h3>
          <div className="estrutura-lista">
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">7 quartos</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">5 suítes</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">Até 28 hóspedes</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">Banheiros internos reformados</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">Dois lavabos de apoio próximos à sauna</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">Internet de 500MB</span>
            </div>
            <div className="estrutura-item">
              <span className="estrutura-bullet">•</span>
              <span className="estrutura-texto">Segurança com câmeras, automação e porteiro eletrônico</span>
            </div>
          </div>
        </div>
        
        <div className="acomodacoes-grid">
          {ambientes.map((ambiente, index) => (
            <div key={index} className="acomodacao-card">
              <div className="acomodacao-carousel">
                <Slider {...settings}>
                  {ambiente.fotos.map((foto, fotoIndex) => (
                    <div key={fotoIndex} className="slide-item">
                      <img 
                        src={foto} 
                        alt={`${ambiente.nome} - ${fotoIndex + 1}`} 
                        className="acomodacao-img"
                        onClick={() => openLightbox(ambiente.fotos, fotoIndex)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="acomodacao-info">
                <h3 className="acomodacao-nome">{ambiente.nome}</h3>
                <p className="acomodacao-descricao">{ambiente.descricao}</p>
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

export default Comodidades;
