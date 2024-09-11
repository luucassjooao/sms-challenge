
# Teste back-end Precato
## Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
- Docker
- Docker compose
## Variáveis de Ambiente

Para executar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

```bash
POSTGRES_USER=yourUser
POSTGRES_PASSWORD=yourPassword
POSTGRES_DB=yourDatabase
URL_POSTGRES=postgres://<user>:<password>@localhost:5432/<database>
PORT=3000

```
## Documentação da API

#### Envia um SMS para o telefone desejado

```http
  POST /sendSms
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `phone` | `string` | **Obrigatório**. Telefone que chegará o sms |
| `message` | `string` | **Obrigatório**. Mensagem que chegara junto com sms |

Exemplo de resposta:
```http
{
	"message": "SMS Enviado!",
	"sendSMS": {
		"id": 1,
		"phone": "+5531999999999",
		"message": "oi",
		"status": "",
		"created_at": "2024-09-11T14:44:48.666Z",
		"updated_at": "2024-09-11T14:44:48.666Z"
	}
}
```


#### Retorna as mudanças nos status das mensagens

```http
  POST /status
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `messageStatus` | `string` | **Obrigatório**. Novo Status da mensagem |
| `messageId` | `number` | **Obrigatório**. Id da Mensagem que deve ser alterado |

```http
{
	"message": "Status da mensagem atualizado"
}
```

#### Retorna todos SMS enviados a 24 horas atrás por um status específico

```http
  GET /getAllSMSByStatus
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `string` | **Obrigatório**. Status que quer visualizar - [ENVIADO, RECEBIDO, ERRO DE ENVIO, ''] |


Exemplo de resposta:
```http
[
  {
    "id": 1,
    "phone": "",
    "message": "",
    "status": "ENVIADO",
    "created_at": "2024-09-11T12:00:00Z",
    "updated_at": "2024-09-11T12:05:00Z"
  }
]

```
## Rodando localmente

#### Clonar o repositório

```bash
  git clone https://github.com/luucassjooao/sms-challenge
  cd sms-challenge
```

#### Instalar dependências

```bash
  pnpm install
```

#### Executar Docker Compose
Subir o container do PostgreSQL

```bash
  pnpm run docker:up
```

#### Criar Tabelas no Banco
Executar o seguinte comando para entrar no container do PostgreSQL
```bash
  docker exec -it sms_challenge psql -u <úsario> -d <DB>
```

Execute o script SQL para criar a tabela e o trigger

```bash
CREATE TABLE IF NOT EXISTS sms (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(14) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(255) DEFAULT '',
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


#### Iniciar o servidor

```bash
  pnpm run dev
```

