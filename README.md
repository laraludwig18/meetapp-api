# MeetApp

App agregador de eventos para desenvolvedores desenvolvido como projeto final do Bootcamp GoStack 7.0

## Inicialização

### Backend

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
**yarn sequelize db:migrate
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
