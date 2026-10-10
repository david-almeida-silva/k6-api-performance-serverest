import http from 'k6/http';
import { check, sleep } from 'k6';
import { generateUserData } from '../data/dynamicData.js';

export const options = {
  vus: 1,
  duration: '15s',
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% das requisições abaixo de 1s
    http_req_failed: ['rate<0.01'],    // Taxa de falhas menor que 1%
  },
};

const BASE_URL = 'https://serverest.dev';

export default function () {
  const user = generateUserData();

  // 1. Criar Usuário
  const resUser = http.post(
    `${BASE_URL}/usuarios`,
    JSON.stringify(user),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(resUser, {
    'Cadastro - Status 201': (r) => r.status === 201,
  });

  // 2. Login
  const loginPayload = JSON.stringify({ email: user.email, password: user.password });
  const resLogin = http.post(
    `${BASE_URL}/login`,
    loginPayload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(resLogin, {
    'Login - Status 200': (r) => r.status === 200,
    'Login - Possui Token': (r) => r.json('authorization') !== undefined,
  });

  sleep(1);
}