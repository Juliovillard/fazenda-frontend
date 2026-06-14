/**
 * GUIA DE INTEGRAÇÃO COM MERCADO PAGO
 * 
 * Para ativar os pagamentos, siga os passos:
 * 
 * 1. Crie uma conta no Mercado Pago: https://www.mercadopago.com.br/
 * 
 * 2. Obtenha suas credenciais:
 *    - Acesse: https://www.mercadopago.com.br/developers/panel/app
 *    - Copie o Public Key e Access Token
 * 
 * 3. Configure as variáveis de ambiente:
 *    - Crie um arquivo .env.local na raiz do projeto
 *    - Adicione:
 *      REACT_APP_MERCADO_PAGO_PUBLIC_KEY=seu_public_key_aqui
 * 
 * 4. Para o backend (Node.js):
 *    - Crie um servidor Node.js com Express
 *    - Instale: npm install mercadopago express cors
 *    - Use o Access Token para criar preferências de pagamento
 * 
 * 5. Exemplo de backend (server.js):
 */

// EXEMPLO DE BACKEND NODE.JS
/*
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

// Configure o Mercado Pago
mercadopago.configure({
  access_token: 'SEU_ACCESS_TOKEN_AQUI'
});

// Endpoint para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  const { nome, email, checkIn, checkOut, hospedes, valor } = req.body;

  const preference = {
    items: [
      {
        title: `Reserva Fazenda - ${checkIn} a ${checkOut}`,
        unit_price: valor,
        quantity: 1,
        currency_id: 'BRL'
      }
    ],
    payer: {
      name: nome,
      email: email
    },
    back_urls: {
      success: 'http://localhost:3000/sucesso',
      failure: 'http://localhost:3000/falha',
      pending: 'http://localhost:3000/pendente'
    },
    auto_return: 'approved',
    notification_url: 'https://seu-site.com/webhook'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
*/

export const MERCADO_PAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY;

export const formatarValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const calcularValorReserva = (checkIn, checkOut, valorDiaria = 4000) => {
  if (!checkIn || !checkOut) return 0;
  
  const inicio = new Date(checkIn);
  const fim = new Date(checkOut);
  const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24));
  
  return dias > 0 ? dias * valorDiaria : 0;
};
