import mqtt from 'mqtt';
import BalloonRepository, {Balloon} from './balloon-repository';
import {allEffects} from "./utils/effects";

export default class MqttService {

    private client: mqtt.Client

    private readonly balloon_management_topic: string;
    private readonly balloon_get_topic: string;
    private readonly balloon_resp_topic: string;

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

        if (!process.env.BALLOON_MNG_TOPIC) {
            throw new Error("No topic given for balloon management")
        }
        this.balloon_management_topic = process.env.BALLOON_MNG_TOPIC!!;

        if (!process.env.BALLOON_GET_TOPIC) {
            throw new Error("No topic given for balloon fetch")
        }
        this.balloon_get_topic = process.env.BALLOON_GET_TOPIC!!;

        if (!process.env.BALLOON_RESP_TOPIC) {
            throw new Error("No topic given for balloon fetch")
        }
        this.balloon_resp_topic = process.env.BALLOON_RESP_TOPIC!!;
    }

    updateAllEffects(effect: string) {
        this.client.publish(this.balloon_management_topic, JSON.stringify({
            effect,
        }), (err, p) => {
            if (err) {
                console.error("Failed to publish on balloon management topic", err)
            }
        });
    }

    askForBalloons() {
        this.client.publish(this.balloon_get_topic, "1", (err, p) => {
            if (err) {
                console.error("Failed to publish on balloon get topic", err)
            }
        })
    }

    updateEffect(balloonId: string, effect: string) {
        this.client.publish(this.balloon_management_topic, JSON.stringify({
            id: balloonId,
            effect,
        }), (err, p) => {
            if (err) {
                console.error("Failed to publish on balloon management topic", err)
            }
        });
    }

    private setupListeners() {
        this.client.subscribe(this.balloon_resp_topic);

        this.client.on("message", (topic, message) => {
            const balloons: Balloon[] = JSON.parse(message.toString())
            this.balloonRepo.updateBalloons(balloons)
        })
    }

}