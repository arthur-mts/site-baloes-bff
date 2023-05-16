import mqtt from 'mqtt';
import BalloonRepository from './balloon-repository';
import {allEffects} from "./utils/effects";

export default class MqttService {

    private client: mqtt.Client

    constructor(private balloonRepo: BalloonRepository) {
        this.client = mqtt.connect(
            process.env.MQTT_URL!!
        )

        this.client.on('connect', () => {
            console.log(`Connection successful!`)
            this.setupListeners()
        })

        this.client.on('error', (err) => {
            console.error(err);
            throw new Error("Failed to connect to mqtt server")
        })
    }

    updateEffect(effect: string) {

        const balloon_management_topic = process.env.BALLOON_MNG_TOPIC;

        if (!balloon_management_topic) {
            throw new Error("No topic given for balloon management");
        }

        this.client.publish(balloon_management_topic, effect, (err, p) => {
            if (err) {
                console.error("Failed to publish on balloon management topic", err)
            }
        });
    }

    private setupListeners() {
        const balloon_quantity_topic = process.env.BALLOON_QUANTITY_TOPIC;
        const balloon_effect_response_topic = process.env.BALLOON_MNG_RESP_TOPIC;

        if (!balloon_effect_response_topic) {
            throw new Error("No topic given for baloon management");
        }
        if (!balloon_quantity_topic) {
            throw new Error("No topic given for balloon management");
        }


        this.client.subscribe(balloon_quantity_topic);
        this.client.subscribe(balloon_effect_response_topic);


        this.client.on("message", (topic, message) => {
            if (topic == balloon_quantity_topic) {
                const balloonQuantity = Number(message.toString())
                this.balloonRepo.updateBalloonQuantity(balloonQuantity)
            } else if (topic == balloon_effect_response_topic) {
                const balloonActualState = message.toString()
                this.balloonRepo.updateBalloonEffect(balloonActualState)
            }
        })
    }

}