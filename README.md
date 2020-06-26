<h1 align="center">MeetApp</h1>

App agregador de eventos para desenvolvedores
  
<br />  
  
<div align="center"> 
  
[![CI](https://github.com/laraludwig18/meetapp-backend/workflows/ci/badge.svg)](https://github.com/laraludwig18/meetapp-backend/actions?query=workflow%3Aci+branch%3Amaster) 
[![Coverage Status](https://coveralls.io/repos/github/laraludwig18/meetapp-backend/badge.svg)](https://coveralls.io/github/laraludwig18/meetapp-backend)

</div>

## Inicialização

Criar banco de dados postgres:
```
docker run --name databaseChallenge -e POSTGRES_PASSWORD=suasenha -p 5432:5432 -d postgres
```
Criar banco de dados redis:
```
docker run --name redismeet -p 6379:6379 -d -t redis:alpine
```
Iniciar banco postgres:
```
docker start databaseChallenge
```
Iniciar banco redis:
```
docker start redismeet
```
Criar arquivo **.env** de acordo com o arquivo **.env.example**

Migrar tabelas para postgres:
```
yarn sequelize db:migrate
```
Instalar dependências:
```
yarn
```
Rodar projeto:
```
yarn dev
```
Rodar fila:
```
yarn queue
```
