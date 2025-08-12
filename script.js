// Espera o botão ser clicado
document.getElementById('enviar').addEventListener('click', () => {
  // Pega o valor digitado no campo de pergunta
  const pergunta = document.getElementById('pergunta').value;

  // Envia a pergunta para o servidor backend
  fetch('http://192.168.2.208:3000/api/pergunta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pergunta }) // envia como JSON
  })
  .then(res => res.json()) // recebe a resposta do servidor
  .then(data => {
    // Exibe a resposta na tela
    document.getElementById('resposta').innerText = data.resposta;
  })
  .catch(err => {
    // Se der erro, mostra mensagem de erro
    console.error('Erro:', err);
    document.getElementById('resposta').innerText = 'Erro ao conectar com o servidor.';
  });
});

let ultimaChamada = 0;

app.post("/api/pergunta", async (req, res) => {
  const agora = Date.now();
  if (agora - ultimaChamada < 5000) {
    return res.status(429).json({ erro: "Espere um pouco antes de perguntar novamente." });
  }
  ultimaChamada = agora;

  // ... resto do código
});

