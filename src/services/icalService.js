import axios from 'axios';

const API_URL = 'https://fazenda-backend-one.vercel.app/api/ical';

export const fetchBlockedDates = async () => {
  try {
    const response = await axios.get(API_URL);
    const icalData = response.data;
    return parseICalData(icalData);
  } catch (error) {
    console.error('Erro ao buscar calendário:', error);
    return { blockedDates: [], priceMap: {} };
  }
};

const parseICalData = (icalData) => {
  const blockedDates = [];
  const priceMap = {};
  const events = icalData.split('BEGIN:VEVENT');
  
  events.forEach(event => {
    if (event.includes('DTSTART') && event.includes('DTEND')) {
      const dtstart = event.match(/DTSTART[;:].*?(\d{8})/)?.[1];
      const dtend = event.match(/DTEND[;:].*?(\d{8})/)?.[1];
      const summary = event.match(/SUMMARY:(.*)/)?.[1];
      
      if (dtstart && dtend) {
        const startDate = parseICalDate(dtstart);
        const endDate = parseICalDate(dtend);
        
        // Extrair preço do summary se existir
        let price = null;
        if (summary) {
          const priceMatch = summary.match(/R\$\s*([\d.,]+)|BRL\s*([\d.,]+)/);
          if (priceMatch) {
            price = parseFloat((priceMatch[1] || priceMatch[2]).replace(/[.,]/g, ''));
          }
        }
        
        const currentDate = new Date(startDate);
        while (currentDate < endDate) {
          const dateKey = currentDate.toISOString().split('T')[0];
          blockedDates.push(new Date(currentDate));
          if (price) {
            priceMap[dateKey] = price;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }
  });
  
  return { blockedDates, priceMap };
};

const parseICalDate = (dateStr) => {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return new Date(year, month - 1, day);
};

export const PRICE_PER_NIGHT = 4090;

export const calculateTotalPrice = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  
  const start = new Date(checkIn + 'T00:00:00');
  const end = new Date(checkOut + 'T00:00:00');
  const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
  
  return { total: days * PRICE_PER_NIGHT, days, avgPrice: PRICE_PER_NIGHT };
};
