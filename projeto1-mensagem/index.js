const express = require('express');
const app = express();
const PORT = 3001;

// Middleware obrigatório para interpretar JSON no body
app.use(express.json());

app.post('/mensagem', (req, res) => {
    try {
    const { nome, idade, time } = req.body;

    // Validação: verifica se todos os campos foram enviados
    if (!nome || idade === undefined || !time) {
    return res.status(400).json({
        erro: 'Dados incompletos. Informe nome, idade e time no corpo da requisição.'
    });
    }

    const frase = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${time}!`;

    return res.status(200).json({ mensagem: frase });
    } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

// Middleware para capturar JSON malformado enviado pelo cliente
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'Formato JSON inválido na requisição.' });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Projeto 1 rodando em http://localhost:${PORT}`);
}); 