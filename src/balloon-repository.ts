import fs from "fs";
import path from "path";

export interface Balloon {
    id: string;
    effect: string;
    battery: number;
    status: 'ACTIVE' | 'INACTIVE';
}
interface BaloonDatabase {
    balloons: Balloon[];
}
export default class BalloonRepository {
    private readonly db: BaloonDatabase;
    private readonly dbPath = path.resolve( "db", "db.json");
    constructor() {
        this.db = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'))
    }

    updateBalloons(balloons: Balloon[]) {
        this.db.balloons = balloons;
        fs.writeFileSync(this.dbPath, JSON.stringify(this.db))
    }

    getBalloons() {
        return this.db.balloons;
    }
}