/**
 * SERVIDOR BACKEND PARA MERCADO PAGO
 * 
 * Para usar este servidor:
 * 1. Crie uma pasta 'backend' na raiz do projeto
 * 2. Execute: npm init -y
 * 3. Instale: npm install express cors mercadopago dotenv
 * 4. Crie um arquivo .env com: MERCADO_PAGO_ACCESS_TOKEN=seu_token
 * 5. Execute: node server.js
 */

const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure o Mercado Pago com seu Access Token
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// Endpoint para criar preferência de pagamento
app.post('/api/create_preference', async (req, res) => {
  const { nome, email, telefone, checkIn, checkOut, hospedes, valor, observacoes } = req.body;

  try {
    const preference = {
      items: [
        {
          title: `Reserva Fazenda Nossa Senhora de Fátima`,
          description: `Check-in: ${checkIn} | Check-out: ${checkOut} | ${hospedes} hóspedes`,
          unit_price: Number(valor),
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      payer: {
        name: nome,
        email: email,
        phone: {
          number: telefone
        }
      },
      back_urls: {
        success: 'http://localhost:3000/?pagamento=sucesso',
        failure: 'http://localhost:3000/?pagamento=falha',
        pending: 'http://localhost:3000/?pagamento=pendente'
      },
      auto_return: 'approved',
      external_reference: `${nome}-${checkIn}-${checkOut}`,
      notification_url: 'https://seu-dominio.com/api/webhook',
      statement_descriptor: 'FAZENDA NSF',
      metadata: {
        nome,
        telefone,
        checkIn,
        checkOut,
        hospedes,
        observacoes
      }
    };

    const response = await mercadopago.preferences.create(preference);
    
    res.json({
      success: true,
      preference_id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao processar pagamento',
      details: error.message
    });
  }
});

// Webhook para receber notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'payment') {
    try {
      const payment = await mercadopago.payment.findById(data.id);
      
      console.log('Pagamento recebido:', {
        id: payment.body.id,
        status: payment.body.status,
        metadata: payment.body.metadata
      });

      // Aqui você pode salvar no banco de dados, enviar email, etc.
      
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro no webhook:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(200);
  }
});

// Endpoint para verificar status do pagamento
app.get('/api/payment/:id', async (req, res) => {
  try {
    const payment = await mercadopago.payment.findById(req.params.id);
    res.json({
      status: payment.body.status,
      status_detail: payment.body.status_detail
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pagamento' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log(`- POST http://localhost:${PORT}/api/create_preference`);
  console.log(`- POST http://localhost:${PORT}/api/webhook`);
  console.log(`- GET  http://localhost:${PORT}/api/payment/:id`);
});
