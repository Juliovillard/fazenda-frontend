import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Reserva.css';
import { FaCalendarAlt, FaUsers, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { fetchBlockedDates, calculateTotalPrice, PRICE_PER_NIGHT } from '../services/icalService';

const Reserva = ({ dadosIniciais }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    checkIn: dadosIniciais?.checkIn || '',
    checkOut: dadosIniciais?.checkOut || '',
    hospedes: dadosIniciais?.hospedes || 1,
    observacoes: ''
  });

  const [checkInDate, setCheckInDate] = useState(dadosIniciais?.checkIn ? new Date(dadosIniciais.checkIn + 'T00:00:00') : null);
  const [checkOutDate, setCheckOutDate] = useState(dadosIniciais?.checkOut ? new Date(dadosIniciais.checkOut + 'T00:00:00') : null);

  const [etapa, setEtapa] = useState(1);
  const [valorTotal, setValorTotal] = useState(0);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
const [, setPriceMap] = useState({});
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const loadBlockedDates = async () => {
      const { blockedDates: dates, priceMap: prices } = await fetchBlockedDates();
      setBlockedDates(dates);
      setPriceMap(prices);
    };
    loadBlockedDates();
  }, []);

  useEffect(() => {
    if (dadosIniciais) {
      setFormData(prev => ({
        ...prev,
        checkIn: dadosIniciais.checkIn,
        checkOut: dadosIniciais.checkOut,
        hospedes: dadosIniciais.hospedes
      }));
      if (dadosIniciais.checkIn) setCheckInDate(new Date(dadosIniciais.checkIn + 'T00:00:00'));
      if (dadosIniciais.checkOut) setCheckOutDate(new Date(dadosIniciais.checkOut + 'T00:00:00'));
    }
  }, [dadosIniciais]);

  const isDateBlocked = (date) => blockedDates.some(b => b.toDateString() === date.toDateString());

  const renderDayContents = (day, date) => (
    <div className="day-with-price">
      <span>{day}</span>
      <span className="day-price">R${PRICE_PER_NIGHT.toLocaleString('pt-BR')}</span>
    </div>
  );

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    const value = date ? date.toISOString().split('T')[0] : '';
    setFormData(prev => ({ ...prev, checkIn: value }));
    if (checkOutDate && date && date >= checkOutDate) {
      setCheckOutDate(null);
      setFormData(prev => ({ ...prev, checkOut: '' }));
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    const value = date ? date.toISOString().split('T')[0] : '';
    setFormData(prev => ({ ...prev, checkOut: value }));
  };

  const calcularDias = () => {
    if (formData.checkIn && formData.checkOut) {
      const inicio = new Date(formData.checkIn);
      const fim = new Date(formData.checkOut);
      const diff = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const calcularValor = () => {
    if (formData.checkIn && formData.checkOut) {
      const priceInfo = calculateTotalPrice(formData.checkIn, formData.checkOut);
      return priceInfo.total;
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dias = calcularDias();
    if (dias < 2) { alert('Mínimo de 2 diárias.'); return; }
    setValorTotal(calcularValor());
    setEtapa(2);
  };

  const processarPagamento = async () => {
    setProcessando(true);
    setErro(null);

    try {
      const response = await axios.post('https://fazenda-backend-one.vercel.app/api/create_preference', {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        hospedes: formData.hospedes,
        valor: valorTotal,
        observacoes: formData.observacoes
      });

      if (response.data.success) {
        // Redireciona para o checkout do Mercado Pago
        window.location.href = response.data.init_point;
      } else {
        throw new Error('Erro ao criar preferência de pagamento');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setErro('Erro ao processar pagamento. Tente novamente ou entre em contato.');
      setProcessando(false);
    }
  };

  const dias = calcularDias();

  return (
    <div className="reserva-page">
      <div className="reserva-container">
        {etapa === 1 && (
          <form onSubmit={handleSubmit} className="reserva-form">
            <div className="form-section">
              <h3 className="form-section-title">Dados Pessoais</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Telefone/WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(21) 99999-9999"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Detalhes da Estadia</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <FaCalendarAlt /> Check-in *
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    maxDate={new Date(2026, 11, 31)}
                    excludeDates={blockedDates}
                    filterDate={(date) => !isDateBlocked(date)}
                    renderDayContents={renderDayContents}
                    placeholderText="Selecione a data"
                    dateFormat="dd/MM/yyyy"
                    className="datepicker-input"
                    withPortal={isMobile}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaCalendarAlt /> Check-out *
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutChange}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate ? new Date(checkInDate.getTime() + 2 * 86400000) : new Date()}
                    maxDate={new Date(2026, 11, 31)}
                    excludeDates={blockedDates}
                    filterDate={(date) => !isDateBlocked(date)}
                    renderDayContents={renderDayContents}
                    placeholderText="Selecione a data"
                    dateFormat="dd/MM/yyyy"
                    className="datepicker-input"
                    withPortal={isMobile}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaUsers /> Número de Hóspedes *
                  </label>
                  <input
                    type="number"
                    name="hospedes"
                    value={formData.hospedes}
                    onChange={handleChange}
                    required
                    min="1"
                    max="20"
                  />
                </div>
              </div>

              {dias > 0 && (
                <div className="resumo-datas">
                  <p>Total de {dias} {dias === 1 ? 'diária' : 'diárias'}</p>
                  <p className="valor-estimado">Valor estimado: R$ {calcularValor().toLocaleString('pt-BR')}</p>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Observações</h3>
              <div className="form-group">
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Alguma solicitação especial ou informação adicional?"
                  rows="4"
                />
              </div>
            </div>

            <button type="submit" className="btn-continuar">
              Continuar para Pagamento
            </button>
          </form>
        )}

        {etapa === 2 && (
          <div className="pagamento-section">
            <div className="resumo-pedido">
              <h3 className="form-section-title">Resumo da Reserva</h3>
              <div className="resumo-item">
                <span>Nome:</span>
                <strong>{formData.nome}</strong>
              </div>
              <div className="resumo-item">
                <span>Check-in:</span>
                <strong>{new Date(formData.checkIn).toLocaleDateString('pt-BR')}</strong>
              </div>
              <div className="resumo-item">
                <span>Check-out:</span>
                <strong>{new Date(formData.checkOut).toLocaleDateString('pt-BR')}</strong>
              </div>
              <div className="resumo-item">
                <span>Hóspedes:</span>
                <strong>{formData.hospedes}</strong>
              </div>
              <div className="resumo-item">
                <span>Diárias:</span>
                <strong>{dias}</strong>
              </div>
              <div className="resumo-item resumo-total">
                <span>Valor Total:</span>
                <strong>R$ {valorTotal.toLocaleString('pt-BR')}</strong>
              </div>
            </div>

            <div className="pagamento-opcoes">
              <h3 className="form-section-title">
                <FaCreditCard /> Forma de Pagamento
              </h3>
              
              <div className="opcoes-pagamento-info">
                <div className="opcao-pagamento">
                  <h4>Pagamento à Vista</h4>
                  <p className="valor-destaque">R$ {valorTotal.toLocaleString('pt-BR')}</p>
                  <p className="descricao-pagamento">PIX, Transferência ou Boleto</p>
                </div>
                
                <div className="opcao-pagamento">
                  <h4>Pagamento Parcelado</h4>
                  <p className="valor-destaque">R$ {valorTotal.toLocaleString('pt-BR')} + taxas</p>
                  <p className="descricao-pagamento">Cartão de Crédito</p>
                </div>
              </div>

              <p className="pagamento-info">
                O pagamento será processado de forma segura pelo Mercado Pago.
              </p>
              
              {erro && <div className="erro-mensagem">{erro}</div>}
              
              <button 
                onClick={processarPagamento} 
                className="btn-pagar"
                disabled={processando}
              >
                {processando ? 'Processando...' : 'Efetuar Pagamento'}
              </button>

              <button onClick={() => setEtapa(1)} className="btn-voltar">
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserva;
