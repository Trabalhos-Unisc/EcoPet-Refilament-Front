# EcoPet Refilament - Frontend

Uma aplicação web (Single Page Application) desenvolvida para gerenciar e monitorar o processo de reciclagem de garrafas PET e sua transformação em filamentos para impressão 3D. A interface permite cadastrar garrafas, montar lotes, acompanhar a extrusão, gerenciar o estoque de filamentos e visualizar métricas de impacto ambiental (como CO₂ evitado).

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface de usuário.
- **[Vite](https://vitejs.dev/)**: Bundler e servidor de desenvolvimento ultrarrápido.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário para estilização e design system (incluindo estilos glassmorphism).
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação da SPA.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones moderna e leve.
- **JavaScript (ES6+)**: Linguagem base do projeto.

---

## Como executar o projeto localmente

Siga o passo a passo abaixo para instalar, configurar e rodar a aplicação na sua máquina.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- **[Git](https://git-scm.com/)**
- **[Node.js](https://nodejs.org/)** (Recomendado versão 18 LTS ou superior)

### 1. Clonar o repositório

Abra o terminal e execute o comando abaixo para clonar o projeto:

```bash
git clone https://github.com/Trabalhos-Unisc/EcoPet-Refilament-Front.git
```

### 2. Acessar o diretório do projeto

Navegue para a pasta que acabou de ser clonada:

```bash
cd EcoPet-Refilament-Front
```

### 3. Instalar as dependências

Baixe todas as bibliotecas necessárias para o funcionamento do projeto usando o gerenciador de pacotes do Node (NPM):

```bash
npm install
```

### 4. Rodar o servidor de desenvolvimento

Inicie o servidor de desenvolvimento local. A aplicação ficará disponível em `http://localhost:5176` (ou na porta indicada no terminal):

```bash
npm run dev
```

### 5. Compilar para Produção (Opcional)

Caso deseje gerar os arquivos estáticos otimizados para deploy em um ambiente de produção (como Vercel, Netlify, etc), execute:

```bash
npm run build
```
Os arquivos prontos para produção serão gerados na pasta `dist/`.
