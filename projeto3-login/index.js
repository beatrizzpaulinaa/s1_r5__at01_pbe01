const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

app.use(express.json());

app.post('/login', (req, res) => {
    try {
    const { usuario, senha } = req.body;

    // 1. Verifica se os campos foram enviados
    if (!usuario || !senha) {
    return res.status(400).json({
        erro: 'Usuário e senha são obrigatórios.'
    });
    }

    // 2. Lê e converte o arquivo JSON de usuários
    const caminhoArquivo = path.join(__dirname, 'usuarios.json');
    const dadosBrutos = fs.readFileSync(caminhoArquivo, 'utf-8');
    const listaUsuarios = JSON.parse(dadosBrutos);

    // 3. Verifica se existe algum usuário com login e senha correspondentes
    const usuarioValido = listaUsuarios.find(
    (u) => u.usuario === usuario && u.senha === senha
    );

    if (!usuarioValido) {
      // Status 401: Unauthorized (Não autorizado)
    return res.status(401).json({
        erro: 'Usuário ou senha incorretos.'
    });
    }

    return res.status(200).json({
    mensagem: `Login realizado com sucesso! Bem-vindo, ${usuarioValido.usuario}.`
    });
    } catch (error) {
    console.error(error);
    return res.status(500).json({
    erro: 'Erro interno ao processar autenticação ou ler arquivo de usuários.'
    });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'Formato JSON inválido na requisição.' });
}
    next();
});

app.listen(PORT, () => {
    console.log(`Projeto 3 rodando em http://localhost:${PORT}`);
});