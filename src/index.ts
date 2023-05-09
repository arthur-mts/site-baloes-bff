import express from 'express';
import dotenv from 'dotenv';
import MqttService from './mqtt-service';
import bodyParser from "body-parser";
import BalloonRepository from './balloon-repository';
import {allEffects} from "./utils/effects";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
const port = process.env.PORT;

const baloesRepository = new BalloonRepository();
const mqttService = new MqttService(baloesRepository);

app.get('/balloons/qnt', (_, res)=>{
    res.status(200).send(baloesRepository.getBalloonQuantity().toString())
})

app.put('/balloons/effect', (req, res) => {
    const effect = req.body
    const validBalloonStates = Object.keys(allEffects)
    if (!(effect in validBalloonStates)) {
        res.status(400)
            .send(`Invalid balloon effect: ${effect}`)
    }
    mqttService.updateEffect(effect);
    res.status(200).send()
})

app.get('/balloons/effect', (_, res) => {
    res.status(200).send(baloesRepository.getBalloonEffect())
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})