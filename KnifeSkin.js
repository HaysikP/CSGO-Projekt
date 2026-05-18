import { GameItem } from "./GameItem.js";
export class KnifeSkin extends GameItem {
    _isStatTrak;
    constructor(id, name, rarity, basePrice, wear, isStatTrak) {
        super(id, name, rarity, basePrice, wear);
        this._isStatTrak = isStatTrak;
    }
    get isStatTrak() { return this._isStatTrak; }
    // Implementace výpočtu: Nože si drží cenu lépe (wear ubírá max 20 %), StatTrak zdvojnásobí cenu
    calculateSellPrice() {
        const wearMultiplier = 1 - (this._wear * 0.2);
        let finalPrice = this._basePrice * wearMultiplier;
        if (this._isStatTrak) {
            finalPrice *= 2.0;
        }
        return Math.round(finalPrice * 100) / 100;
    }
}
