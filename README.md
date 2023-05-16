## Site Balões BFF
APP que comunica o [site-baloes](https://github.com/danivict/site-baloes) com o broker MQTT.

## Endpoints que esse serviço expões

###  GET /balloons   
Retorna uma lista que descreve os balões disponíveis  
Exemplo:
 ```json
[
    {
        "id": "1",
        "effect": "1",
        "battery": 50, //0-100%
        "status": "ACTIVE"
    },
    {
        "id": "2",
        "effect": "2",
        "battery": 50, //0-100%
        "status": "ACTIVE"
    }
]
```
  

## PUT /balloons/{id}/effect  
Valida e atualiza o efeito recebido no corpo da requisição para um balão específico.
```http request
PUT http://localhost:8090/balloons/1/effect
Content-Type: text/plain

10
```
## PUT /balloons/effect
Valida e atualiza o efeito recebido no corpo da requisição para todos os balões.
```http request
PUT http://localhost:8090/balloons/effect
Content-Type: text/plain

10
```



## Tópicos MQTT

### /baloes/get
Nesse topico requisitamos a reposta dos balões atualizados para que seja enviada no tópico abaixo.  
Para testar, use esse comando:
```sh
mosquitto_sub -h localhost -p 9001 -t /baloes/get
```

### /baloes/resp
Nesse tópico escutamos as alterações dos balões disponíveis.  
Para testar, use esse comando:
```sh
mosquitto_pub -h localhost -p 9001 -m "[{\"id\": \"1\", \"effect\": \"10\",\"status\": \"ACTIVE\", \"battery\": 50  }]" -t /baloes/resp
```

### /baloes/efeito
Nesse tópico enviamos o novo estado do balão para o Raspbery.  
Estamos nos baseando nessa [tabela](https://drive.google.com/file/d/1_KGfdcrTQomxAG5iJWVJCV57ar3hdRJ7/view).  
Para testar, use esse comando:
```sh
mosquitto_sub -h localhost -p 9001 -t /baloes/efeito
```