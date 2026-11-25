const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

app.post('/soma', (req, res) => {
    try {
    const { num1, num2, num3 } = req.body;
    const erros = [];

    // Função auxiliar para verificar se é um número válido (rejeita strings, booleanos, null, NaN)
    const ehNumeroValido = (valor) => typeof valor === 'number' && !Number.isNaN(valor);

    if (!ehNumeroValido(num1)) erros.push('O campo "num1" deve ser um valor numérico válido.');
    if (!ehNumeroValido(num2)) erros.push('O campo "num2" deve ser um valor numérico válido.');
    if (!ehNumeroValido(num3)) erros.push('O campo "num3" deve ser um valor numérico válido.');

    // Se houver algum problema, retorna status 400 e a lista de erros
    if (erros.length > 0) {
        return res.status(400).json({
        erro: 'Falha na validação dos dados.',
        detalhes: erros
    });
    }

    const resultado = num1 + num2 + num3;

    return res.status(200).json({ resultado });
    } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'Formato JSON inválido na requisição.' });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Projeto 2 rodando em http://localhost:${PORT}`);
});