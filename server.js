import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let ultimaChamada = 0;

app.post("/api/pergunta", async (req, res) => {
  const agora = Date.now();
  if (agora - ultimaChamada < 5000) {
    return res.status(429).json({ erro: "Espere 5 segundos antes de perguntar novamente." });
  }
  ultimaChamada = agora;

  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.pergunta }],
      temperature: 0.7
    });

    res.json({ resposta: resposta.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao processar a pergunta." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
