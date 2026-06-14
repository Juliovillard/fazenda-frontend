import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaBox.css';
import { fetchBlockedDates, calculateTotalPrice, PRICE_PER_NIGHT } from '../services/icalService';

const ReservaBox = ({ onReservaClick }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [hospedes, setHospedes] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);
  const [priceMap, setPriceMap] = useState({});

  useEffect(() => {
    const loadBlockedDates = async () => {
      const { blockedDates: dates, priceMap: prices } = await fetchBlockedDates();
      setBlockedDates(dates);
      setPriceMap(prices);
    };
    loadBlockedDates();
  }, []);

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    // Garante mínimo 2 diárias
    if (checkOut && date) {
      const diff = Math.round((checkOut - date) / (1000 * 60 * 60 * 24));
      if (diff < 2) setCheckOut(null);
    }
  };

  const renderDayContents = (day, date) => (
    <div className="day-with-price">
      <span>{day}</span>
      <span className="day-price">R${PRICE_PER_NIGHT.toLocaleString('pt-BR')}</span>
    </div>
  );

  const getEstimatedPrice = () => {
    if (!checkIn || !checkOut) return null;
    return calculateTotalPrice(
      checkIn.toISOString().split('T')[0],
      checkOut.toISOString().split('T')[0]
    );
  };

  const priceInfo = getEstimatedPrice();

  const isDateBlocked = (date) => blockedDates.some(b => b.toDateString() === date.toDateString());

  const handleReservar = () => {
    if (!checkIn || !checkOut || !hospedes) { alert('Por favor, preencha todos os campos'); return; }
    const diff = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (diff < 2) { alert('Mínimo de 2 diárias.'); return; }
    onReservaClick({
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      hospedes
    });
  };

  return (
    <div className="reserva-section">
      <div className="reserva-container">
        <div className="reserva-box">
          <div className="reserva-fields">
            <div className="field-group date-field">
              <label>CHECK-IN</label>
              <DatePicker
                selected={checkIn}
                onChange={handleCheckInChange}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={new Date()}
                maxDate={new Date(2026, 11, 31)}
                excludeDates={blockedDates}
                filterDate={(date) => !isDateBlocked(date)}
                renderDayContents={renderDayContents}
                placeholderText="Selecione a data"
                dateFormat="dd/MM/yyyy"
                openToDate={checkIn || new Date()}
              />
            </div>

            <div className="field-divider"></div>

            <div className="field-group date-field">
              <label>CHECK-OUT</label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn ? new Date(checkIn.getTime() + 2 * 86400000) : new Date()}
                maxDate={new Date(2026, 11, 31)}
                excludeDates={blockedDates}
                filterDate={(date) => !isDateBlocked(date)}
                renderDayContents={renderDayContents}
                placeholderText="Selecione a data"
                dateFormat="dd/MM/yyyy"
                openToDate={checkOut || checkIn || new Date()}
              />
            </div>

            <div className="field-divider"></div>

            <div className="field-group">
              <label>HÓSPEDES</label>
              <div 
                className="guest-selector"
                onClick={() => setShowGuestPicker(!showGuestPicker)}
              >
                <span>{hospedes} {hospedes === 1 ? 'hóspede' : 'hóspedes'}</span>
              </div>
              
              {showGuestPicker && (
                <div className="guest-picker" onClick={(e) => e.stopPropagation()}>
                  <div className="guest-control">
                    <button 
                      type="button"
                      onClick={() => setHospedes(Math.max(1, hospedes - 1))}
                      disabled={hospedes <= 1}
                    >
                      -
                    </button>
                    <span>{hospedes}</span>
                    <button 
                      type="button"
                      onClick={() => setHospedes(hospedes + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    type="button"
                    className="guest-close"
                    onClick={() => setShowGuestPicker(false)}
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>

          {priceInfo && (
            <div className="price-info">
              <p className="price-days">{priceInfo.days} {priceInfo.days === 1 ? 'diária' : 'diárias'}</p>
              <p className="price-total">R$ {priceInfo.total.toLocaleString('pt-BR')}</p>
            </div>
          )}

          <button type="button" className="btn-reservar-box" onClick={handleReservar}>
            Reservar agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservaBox;
