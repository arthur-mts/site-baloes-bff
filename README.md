## Site Balões BFF
APP que comunica o [site-baloes](https://github.com/danivict/site-baloes) com o broker MQTT.

## Endpoints que esse serviço expões

- GET /balloons/qnt   
Retorna um inteiro se existir o registro de quantidade de balões no banco de dados.
  

- GET /balloons/effect  
Retorna o numero referente ao efeito, se existir o registro no banco de dados.
  

- PUT /balloons/effect  
Valida e registra o efeito recebido no corpo da requisição.


## Tópicos MQTT

### /baloes/qnt
Nesse tópico escutamos a quantidade de balões disponíveis para personalização.  
Para testar, podemos executar esse comando e enviar uma mensagem:
```sh
mosquitto_pub -h localhost -p 9001 -m "10" -t baloon/qnt
```

### /baloes/efeito
Nesse tópico enviamos o novo estado do balão para o Raspbery.

Estamos nos baseando nessa [tabela](https://drive.google.com/file/d/1_KGfdcrTQomxAG5iJWVJCV57ar3hdRJ7/view)

### /baloes/efeito/get
Nesse tópico escutaremos as mudanças do estado do balão
