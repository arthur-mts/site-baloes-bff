# Site Balões Backend
APP que comunica o [site-baloes](https://github.com/danivict/site-baloes) com o broker MQTT.

## Endpoints HTTP

###  GET /balloons   
Retorna uma lista que descreve os balões disponíveis.  
O campo ID é o MAC address daquele ESP-32.  
Exemplo:
 ```json
[
    {
        "id": "00-B0-D0-63-C2-26",
        "effect": "1",
        "battery": 50, //0-100%
        "status": "ACTIVE",
        "signal": -55 //-99 - 0
    },
    {
        "id": "00-B0-D0-63-C2-26",
        "effect": "2",
        "battery": 50, //0-100%
        "status": "ACTIVE",
        "signal": -55 //-99 - 0
    }
]
```
  

## PUT /balloons/effect  
Valida e atualiza o efeito recebido no corpo da requisição para um balão específico.
```http request
PUT http://localhost:8090/balloons/effect
Content-Type: application/json

{
    "id": "00-B0-D0-63-C2-26",
    "effect": "2"
}
```
Deve retornar um erro 400 se o ID ou o efeito forem inválidos.
## PUT /balloons/effect
Valida e atualiza o efeito recebido no corpo da requisição para todos os balões.
```http request
PUT http://localhost:8090/balloons/effect/all
Content-Type: application/json

{
    "effect": "2"
}
```

---

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
mosquitto_pub -h localhost -p 9001 -m "[{\"id\":\"00-B0-D0-63-C2-26\",\"effect\":\"1\",\"battery\":50,\"status\":\"ACTIVE\",\"signal\":-55},{\"id\":\"00-B0-D0-63-C2-26\",\"effect\":\"2\",\"battery\":50,\"status\":\"ACTIVE\",\"signal\":-55}]" -t /baloes/resp
```

### /baloes/efeito
Nesse tópico enviamos o novo estado do balão para o Raspbery.  
Estamos nos baseando nessa [tabela](https://drive.google.com/file/d/1_KGfdcrTQomxAG5iJWVJCV57ar3hdRJ7/view).  
Para testar, use esse comando:
```sh
mosquitto_sub -h localhost -p 9001 -t /baloes/efeito
```