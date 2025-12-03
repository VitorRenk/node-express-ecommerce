const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// @note Criando o app
const app = express();

// @note Configurando Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// @note Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// @note Middleware para parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// @note Dados de produtos (simulado)
const produtos = [
  {
    id: 1,
    nome: "Notebook",
    preco: 2500,
    descricao: "Notebook 15 polegadas",
    imagem: "📱",
  },
  {
    id: 2,
    nome: "Mouse",
    preco: 50,
    descricao: "Mouse wireless",
    imagem: "🖱️",
  },
  {
    id: 3,
    nome: "Teclado",
    preco: 150,
    descricao: "Teclado mecânico RGB",
    imagem: "⌨️",
  },
  {
    id: 4,
    nome: "Monitor",
    preco: 800,
    descricao: "Monitor 27 polegadas",
    imagem: "🖥️",
  },
  {
    id: 5,
    nome: "Headset",
    preco: 300,
    descricao: "Headset com microfone",
    imagem: "🎧",
  },
  {
    id: 6,
    nome: "Webcam",
    preco: 200,
    descricao: "Webcam Full HD",
    imagem: "📷",
  },
  {
    id: 7,
    nome: "Impressora",
    preco: 600,
    descricao: "Impressora multifuncional",
    imagem: "🖨️",
  },
  {
    id: 8,
    nome: "Tablet",
    preco: 1200,
    descricao: "Tablet 10 polegadas",
    imagem: "📲",
  },
];

let carrinho = [];

// @note Rota Home - Listagem de produtos
app.get("/", (req, res) => {
  res.render("index", {
    titlePage: "Loja Online",
    user: "Cliente",
    currentYear: new Date().getFullYear(),
    produtos: produtos,
    totalCarrinho: carrinho.length,
  });
});

// @note Rota Adicionar ao carrinho
app.post("/carrinho/adicionar", (req, res) => {
  const { produtoId } = req.body;
  const produto = produtos.find((p) => p.id == produtoId);

  if (produto) {
    carrinho.push(produto);
  }

  res.redirect("/");
});

// @note Rota Carrinho
app.get("/carrinho", (req, res) => {
  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  res.render("carrinho", {
    titlePage: "Carrinho",
    user: "Cliente",
    currentYear: new Date().getFullYear(),
    carrinho: carrinho,
    total: total,
    totalCarrinho: carrinho.length,
  });
});

// @note Rota Limpar carrinho
app.post("/carrinho/limpar", (req, res) => {
  carrinho = [];
  res.redirect("/carrinho");
});

// @note Tratamento de erro 404
app.use((req, res) => {
  res.status(404).render("404", {
    titlePage: "Página não encontrada",
    totalCarrinho: carrinho.length,
  });
});

// @note Iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 E-commerce rodando em http://localhost:${PORT}`);
});
