require("dotenv").config(); // carrega o .env

const express = require("express");
const cors = require("cors");
const axios = require("axios");

console.log("Chave carregada do .env:", process.env.OPENAI_API_KEY);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/pergunta", async (req, res) => {
  const { pergunta } = req.body;

  try {
    const resposta = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: pergunta }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ resposta: resposta.data.choices[0].message.content });
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error.message);
    res.status(500).json({ erro: "Erro ao conectar com a OpenAI." });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
