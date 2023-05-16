import fs from "fs";
import path from "path";
interface BaloonDatabase {
    qnt: number;
    effect: string;
}
export default class BalloonRepository {
    private readonly db: BaloonDatabase;
    private readonly dbPath = path.resolve( "db", "db.json");
    constructor() {
        this.db = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'))
    }

    updateBalloonQuantity(quant: number) {
        this.db.qnt = quant;
        fs.writeFileSync(this.dbPath, JSON.stringify(this.db))
    }

    updateBalloonEffect(effect: string) {
        this.db.effect = effect;
        console.log(this.db)
        fs.writeFileSync(this.dbPath, JSON.stringify(this.db))
    }

    getBalloonQuantity() {
        return this.db.qnt;
    }

    getBalloonEffect() {
        return this.db.effect;
    }


}