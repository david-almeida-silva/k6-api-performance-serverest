# 🚀 K6 API Performance & Load Testing — ServeRest

![K6](https://img.shields.io/badge/K6-Grafana-7D4698?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Build Status](https://img.shields.io/badge/Status-Passed-brightgreen?style=for-the-badge)

Este repositório contém uma suíte de testes de **Performance, Carga e Estresse de API**, desenvolvida com **K6 (Grafana)** para validar os tempos de resposta e a resiliência dos serviços da plataforma [ServeRest](https://serverest.dev/).

O projeto foi construído focando em boas práticas de **Engenharia de Qualidade (QE)** e **DevOps**, aplicando controle de SLAs (*Thresholds*), geração de massa de dados dinâmica por thread/VU e execução contínua via **GitHub Actions**.

---

## 🎯 Objetivos do Projeto

- **Smoke Testing:** Validação rápida de sanidade dos endpoints e verificação de contratos básicos sob carga mínima (1 VU).
- **Load Testing:** Simulação de uso realista em horário de pico com rampas de subida (*ramp-up*), sustentação e redução (*ramp-down*).
- **SLA & Thresholds:** Garantir que 95% das requisições respondam em menos de **1.5s** (p95 < 1500ms) e que a taxa de erros permaneça abaixo de **5%**.
- **Independência de Dados:** Uso de timestamps dinâmicos (`Date.now()`) para evitar erros de duplicidade/concorrência no banco de dados durante requisições paralelas.

---

## 📂 Estrutura do Projeto

    k6-api-performance-serverest/
    ├── .github/
    │   └── workflows/
    │       └── k6-performance.yml
    ├── data/
    │   └── dynamicData.js
    ├── tests/
    │   ├── smoke-test.js
    │   └── load-test.js
    ├── .gitignore
    ├── package.json
    └── README.md

---

## 🛠️ Tecnologias e Ferramentas

- **[K6](https://k6.io/):** Ferramenta open-source da Grafana para testes de carga de alta performance.
- **JavaScript (ES6+):** Linguagem utilizada para construir os cenários e lógicas de validação.
- **GitHub Actions:** Esteira de Integração Contínua (CI/CD) utilizando a action oficial `grafana/setup-k6-action@v1`.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **K6** instalado em sua máquina:

- **Windows (Winget):**
    winget install k6 --source winget

- **macOS (Homebrew):**
    brew install k6

---

### Executando os Testes

1. **Clone o repositório:**
    git clone https://github.com/SEU_USUARIO/k6-api-performance-serverest.git
    cd k6-api-performance-serverest

2. **Executar o Smoke Test (Teste de Fumaça):**
    npm run test:smoke

3. **Executar o Load Test (Teste de Carga):**
    npm run test:load

---

## ⚙️ Como Subir e Executar no GitHub Actions (CI/CD)

O projeto possui uma esteira configurada em `.github/workflows/k6-performance.yml`. Sempre que um `push` ou `pull_request` é realizado para a branch `main`, o GitHub Actions executa os testes automaticamente.

### Passo a Passo para Versionar no GitHub:

1. **Inicializar o Git e Fazer o Commit:**
    git init
    git add .
    git commit -m "feat: adiciona suite de testes de performance com k6 e ci/cd"
    git branch -M main

2. **Vincular o Repositório Remoto:**
    git remote add origin https://github.com/SEU_USUARIO/k6-api-performance-serverest.git

3. **Enviar o Código:**
    git push -u origin main

4. **Visualizar a Execução na Nuvem:**
   - Acesse a aba **Actions** no repositório do GitHub.
   - Acompanhe os jobs `Executar Smoke Test` e `Executar Load Test` sendo validados com o check verde ✅.

---

## 📊 Métricas e SLAs Configurados

| Métrica | SLA / Limite | Descrição |
| :--- | :--- | :--- |
| `http_req_duration` | `p(95) < 1500ms` | 95% das requisições devem responder em até 1.5 segundo. |
| `http_req_failed` | `rate < 0.05` | A taxa total de erros de requisição não pode ultrapassar 5%. |
| `checks` | `100% success` | Validação de criação de usuário, geração de token Bearer e cadastro de produto. |

---

Desenvolvido por David Silva 👋🏼 
- [LinkedIn](https://www.linkedin.com/in/david-almeida-silva/)