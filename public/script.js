document.getElementById('enviar').addEventListener('click', () => {
  const pergunta = document.getElementById('pergunta').value.trim();
  if (!pergunta) {
    document.getElementById('resposta').innerText = 'Digite uma pergunta.';
    return;
  }

  document.getElementById('resposta').innerText = 'Carregando...';

  fetch('/api/pergunta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pergunta })
  })
  .then(res => res.json())
  .then(data => {
    if (data.erro) {
      document.getElementById('resposta').innerText = data.erro;
    } else {
      document.getElementById('resposta').innerText = data.resposta;
    }
  })
  .catch(err => {
    console.error('Erro:', err);
    document.getElementById('resposta').innerText = 'Erro ao conectar com o servidor.';
  });
});
