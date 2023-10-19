# Projeto Talker Manager
<br>

### 💻 Descrição
O projeto Talker Manager é uma aplicação para cadastro, visualização, pesquisa, edição e exclusão de palestrantes (talkers). A aplicação oferece uma API para operações CRUD e utiliza o módulo fs para armazenar dados em arquivos. Ideal para gerenciar informações de palestrantes de forma simples e eficaz. O projeto utiliza Node.js com Express na construção de APIs REST
<br>

### 💡 Orientações
Este projeto utiliza contêineres Docker para gerenciar o ambiente de desenvolvimento. Isso facilita a configuração do ambiente e garante a consistência entre diferentes sistemas. Certifique-se de ter o Docker instalado em seu sistema antes de prosseguir.
<br>

<details>
<summary> 🐳 Início rápido com Docker</summary><br>

```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev

```
</details>

<details>
<summary>🖥️ Início rápido sem Docker</summary><br>

> Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo [`env.example`](./env.example) e o modifique de acordo com a necessidade.


```bash
# em um terminal, inicie a aplicação
npm install
env $(cat .env) npm start
# ou para iniciar com live-reload
env $(cat .env) npm run dev

```

</details>

### 🙋‍♀️  Autor

- [@helmatrindade](https://github.com/helmatrindade)
