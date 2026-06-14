import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ReservaBox from './components/ReservaBox';
import PaginaInicial from './components/PaginaInicial';
import Comodidades from './components/Comodidades';
import AFazendaPage from './components/AFazendaPage';
import Lazer from './components/Lazer';
import Experiencia from './components/Experiencia';
import Tarifas from './components/Tarifas';
import Contato from './components/Contato';
import Reserva from './components/Reserva';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import casa1 from './casa1.jpg';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('home');
  const [dadosReserva, setDadosReserva] = useState(null);

  const handleInicioClick = () => {
    setPaginaAtiva('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComodidadesClick = () => {
    setPaginaAtiva('acomodacoes');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleMenuClick = (pagina) => {
    setPaginaAtiva(pagina);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReservaClick = (dados) => {
    setDadosReserva(dados);
    setPaginaAtiva('reserva');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="App">
      <Header 
        onComodidadesClick={handleComodidadesClick} 
        onInicioClick={handleInicioClick}
        onMenuClick={handleMenuClick}
        paginaAtiva={paginaAtiva}
      />
      <div className="hero-image">
        <img src={casa1} alt="Fazenda Nossa Senhora de Fátima" />
      </div>
      <ReservaBox onReservaClick={handleReservaClick} />
      
      {paginaAtiva === 'home' && <PaginaInicial />}
      {paginaAtiva === 'fazenda' && <AFazendaPage />}
      {paginaAtiva === 'acomodacoes' && <Comodidades />}
      {paginaAtiva === 'lazer' && <Lazer />}
      {paginaAtiva === 'experiencia' && <Experiencia />}
      {paginaAtiva === 'tarifas' && <Tarifas />}
      {paginaAtiva === 'contato' && <Contato />}
      {paginaAtiva === 'reserva' && <Reserva dadosIniciais={dadosReserva} />}
      
      <main>
        {/* Conteúdo do site será adicionado aqui */}
      </main>
      
      <Footer onMenuClick={handleMenuClick} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
