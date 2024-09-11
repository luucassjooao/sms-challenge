
# Teste back-end Precato
## Apêndice

Decidi usar um docker-compose para subir BD mais facilmente. Como utilizei SQL puro no projeto, resolvi fazer as coisas de um jeito mais mão na massa. Para criar a tabela e um trigger, precisamos entrar no console, mais precisamente, dentro do contêiner do Docker para executarmos os códigos SQL.

Para a atualização do status da mensagem, temos uma rota que faz essa alteração, mas para que essa rota funcionasse, precisamos ter uma rota/URL que seja disponível para a API externa conseguisse mandar um webhook, e como o projeto está rodando localmente, estou utilizando o ngrok para ter um jeito de expor a API para esse serviço externo.


## Variáveis de Ambiente

Para executar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, todas estão presentes no .env.example

`POSTGRES_USER`=variável que utilizamos para setar o nosso usuário no docker

`POSTGRES_PASSWORD`=variável que utilizamos para setar a nossa senha no docker

`POSTGRES_DB`=váriavel que utilizamos para setar qual o nome do nosso banco no docker

`URL_POSTGRES`=variável que conecta ao contêiner do docker

`PORT`=variável que comanda em qual porta voce deseja que a API se exponha

`TWILIO_ACCOUNT_SID`=id da sua conta no twilio

`TWILIO_AUTH_TOKEN`=token de autorização no twilio

`TWILIO_PHONE_NUMBER`=número de telefone disponibilizado pelo twilio

`TWILIO_STATUS_CALLBACK_URL`=url/rota para o twilio mandar mudanças de status das mensagens


## Documentação da API

#### Envia um SMS para o telefone desejado

```http
  POST /sendSms
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `phone` | `string` | **Obrigatório**. Telefone que chegará o sms |
| `message` | `string` | **Obrigatório**. Mensagem que chegara junto com sms |

#### Retorna as mudanças nos status das mensagens

```http
  POST /status
```

Não precisamos enviar nada, e nem retornamos nada, essa é uma rota que a API externa, envia o novo status da mensagem

#### Retorna todos SMS enviados a 24 horas atrás por um status específico

```http
  GET /getAllSMSByStatus
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `string` | **Obrigatório**. Status que quer visualizar - [ENVIADO, RECEBIDO, ERRO DE ENVIO, ''] |



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/luucassjooao/sms-challenge
```

Entre no diretório do projeto

```bash
  cd sms-challenge
```

Instale as dependências

```bash
  pnpm i
```

Inicie um container docker com o docker-compose

```bash
  pnpm run docker:up
```

Entrar dentro do container

```bash
  docker exec -it sms_challenge psql -u <nome do úsario> -d <nome do DB>
```

Executamos o script SQL

```bash
CREATE TABLE IF NOT EXISTS sms (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(14) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(255) DEFAULT '',
  messageId VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at_trigger() RETURNS TRIGGER
AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sms_update_updated_at
BEFORE UPDATE ON sms
FOR EACH ROW EXECUTE FUNCTION set_updated_at_trigger();
```

iniciando o ngrok

```bash
  ngrok http <port>
```

setando a url + rota para alteração do status das mensagens

```bash
  TWILIO_STATUS_CALLBACK_URL=<ngrok url>/status
```


Inicie o servidor

```bash
  pnpm run dev
```

