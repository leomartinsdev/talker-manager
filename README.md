# Talker Manager 🎤
Aplicação back-end de uma API RESTful de um CRUD onde o usuário pode cadastrar, visualizar, pesquisar, editar e excluir informações dos talkers (palestrantes).
<br><br>
O aplicativo foi desenvolvido utilizando Node.js e Express como framework para Node.js. Para fácil execução da aplicação em qualquer máquina, ela foi dockerizada.
<br><br>

## Feito com 👨‍💻:
- JavaScript
- Docker
- Express
- Módulo fs

## Como rodar o projeto
1) Usando Docker (recomendado):
-  Instale as dependências via terminal: `npm install`
-  Inicie os containers: `docker-compose up -d`
-  Acesse o terminal do container: `docker exec -it talker_manager bash`
-  Inicie a aplicação com live-reload: `npm run dev`

2) Sem Docker: Crie um arquivo .env na raiz do projeto seguindo o padrão do arquivo env.example e o modifique de acordo com a necessidade.
-  Instale as dependências via terminal: `npm install`
-  No terminal: `env $(cat .env) npm start` e `env $(cat .env) npm run dev`

## Executando os testes (garanta que a aplicação esteja executando):
- Rodar os testes do mocha: `npm run test:mocha`
- Rodar os testes e mostrar cobertura geral: `npm run test:coverage`
- Rodar os testes e mostrar cobertura de mutações: `npm run test:mutation`
