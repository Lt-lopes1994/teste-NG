## Description

Exercicio de teste para a vaga na empresa NG.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

```typescript
rota de login = http://localhost:8000/api/v1/login

POST:
exemplo de body:
{
"userName": "User name",
"password": "Senha_do_usuario"
}

retorno da rota: {
 "access_token": "JWT_TOKEN"
}

```

```typescript
rota de cadastro = http://localhost:8000/api/v1/user

http://localhost:8000/api/v1/user

POST:
exemplo de body:
{
"userName": "User name",
"password": "Senha_do_usuario"
}

{
 "id": 0,
 "userName": "USER_NAME",
 "accountId": 0
}

```

```typescript
rota de consulta de usuario logado = http://localhost:8000/api/v1/user/account

GET:

Extrai o usuario logado do token JWT com funções automaticas do nestjs

exemplo de retorno:
{
 "id": 2,
 "userName": "Thalita",
 "accountId": {
  "id": 2,
  "balance": 20000
 }
}

```


```typescript
rota de consulta as transações = http://localhost:8000/api/v1/transaction

GET: 
Sem envio de body. Utiliza o usuario logado para consultar as transações.

exemplo de retorno: 
{
 "transacoes_enviadas": 
  [{
    "id": 1,
    "value": 5000,
    "createdAt": "2022-11-21 15:07:51"
},
 ],
 "transacoes_recebidas": [
  {
    "id": 1,
    "value": 5000,
    "createdAt": "2022-11-21 15:07:51"
  },
 ]
}
```

```typescript
rota de transferencia = http://localhost:8000/api/v1/accounts/transactions

PUT: 
Envio de body com o valor da transferencia e o id da conta que irá receber a transferencia.
Data de criação é gerada automaticamente.
id da conta que irá enviar a transferencia é pego do token JWT.

Exemplo de body:
{
 "value": 5000,
 "targetUserName": "USER_NAME"
}

exemplo de retorno: 
{
  "value": 5000,
  "debitedAccount": 2,
  "creditedAccount": 1,
  "id": 4,
  "createdAt": "2022-11-21 17:21:42"
}
```
