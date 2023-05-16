import express from 'express';
import dotenv from 'dotenv';
import MqttService from './mqtt-service';
import bodyParser from "body-parser";
import BalloonRepository from './balloon-repository';
import { allEffects } from "./utils/effects";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
const port = process.env.PORT;

const baloesRepository = new BalloonRepository();
const mqttService = new MqttService(baloesRepository);

app.put('/balloons/:id/effect', async (req, res) => {
    const effect = req.body as string
    const balloonId = req.params['id']
    const validBalloonStates = Object.keys(allEffects)
    if (!(effect in validBalloonStates)) {
        return res.status(400)
            .send(`Invalid balloon effect: ${effect}`)
    }
    mqttService.updateEffect(balloonId, effect);
    mqttService.askForBalloons();
    console.log(`PUT /balloons/${balloonId}/effect: Atualizando balão ${balloonId} para o efeito ${allEffects[effect]}`)

    await new Promise((res, rej) => {
        setTimeout(res, 500)
    });

    const response = baloesRepository.getBalloons()
    return res.status(200).send(response)
})

app.put('/balloons/effect', async (req, res) => {
    const effect = req.body
    const validBalloonStates = Object.keys(allEffects)
    if (!(effect in validBalloonStates)) {
       return res.status(400)
            .send(`Invalid balloon effect: ${effect}`)
    }
    mqttService.updateAllEffects(effect);
    mqttService.askForBalloons();
    console.log(`PUT /balloons/effect/all: Atualizando todos os balões para o efeito ${allEffects[effect]}`)

    await new Promise((res, rej) => {
        setTimeout(res, 500)
    });
    const response = baloesRepository.getBalloons();
    return res.status(200).send(response);
})

app.get('/balloons/', (_, res) => {
    res.status(200).send(baloesRepository.getBalloons())
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})