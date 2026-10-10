import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';
import { generateUserData, generateProductData } from '../data/dynamicData.js';

// Métricas customizadas
const loginDuration = new Trend('tempo_login');
const criarProdutoDuration = new Trend('tempo_criar_produto');
const errosTotal = new Counter('total_erros');

export const options = {
  stages: [
    { duration: '10s', target: 5 },  // Ramp-up suave para 5 VUs
    { duration: '20s', target: 5 },  // Sustenta 5 VUs (ideal para API pública)
    { duration: '10s', target: 0 },  // Ramp-down para 0 VUs
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% das requisições abaixo de 1.5s
    http_req_failed: ['rate<0.05'],    // Erros abaixo de 5%
  },
};

const BASE_URL = 'https://serverest.dev';

export default function () {
  const user = generateUserData();

  // 1. Cadastrar Usuário Administrador
  const resUser = http.post(
    `${BASE_URL}/usuarios`,
    JSON.stringify(user),
    { headers: { 'Content-Type': 'application/json' } }
  );

  const checkUser = check(resUser, { 'Usuario cadastrado': (r) => r.status === 201 });
  if (!checkUser) {
    errosTotal.add(1);
    sleep(1);
    return; // Se falhar a criação do usuário, aguarda e pula para a próxima iteração
  }

  sleep(1); // Think time simulando tempo de digitação humana

  // 2. Login para Obter Token
  const loginPayload = JSON.stringify({ email: user.email, password: user.password });
  const resLogin = http.post(
    `${BASE_URL}/login`,
    loginPayload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  loginDuration.add(resLogin.timings.duration);

  const checkLogin = check(resLogin, {
    'Login com sucesso': (r) => r.status === 200 && r.json('authorization') !== undefined
  });

  if (!checkLogin) {
    errosTotal.add(1);
    sleep(1);
    return;
  }

  const token = resLogin.json('authorization');
  sleep(1);

  // 3. Cadastrar Produto com Token
  const product = generateProductData();
  const resProduct = http.post(
    `${BASE_URL}/produtos`,
    JSON.stringify(product),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
  );

  criarProdutoDuration.add(resProduct.timings.duration);

  const checkProduct = check(resProduct, { 'Produto cadastrado': (r) => r.status === 201 });
  if (!checkProduct) errosTotal.add(1);

  sleep(1); // Pacing final da iteração
}