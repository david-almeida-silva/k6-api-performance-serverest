export function generateUserData() {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 10000);
  return {
    nome: `Usuario K6 ${timestamp}`,
    email: `k6_user_${timestamp}_${randomValue}@qa.com`,
    password: "teste_k6_password",
    administrador: "true"
  };
}

export function generateProductData() {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 10000);
  return {
    nome: `Produto K6 ${timestamp}_${randomValue}`,
    preco: 199,
    descricao: "Produto criado durante teste de carga do K6",
    quantidade: 500
  };
}