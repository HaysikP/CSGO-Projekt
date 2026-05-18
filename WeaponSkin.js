import { GameItem } from "./GameItem.js";
export class WeaponSkin extends GameItem {
    _isStatTrak;
    constructor(id, name, rarity, basePrice, wear, isStatTrak) {
        super(id, name, rarity, basePrice, wear);
        this._isStatTrak = isStatTrak;
    }
    get isStatTrak() { return this._isStatTrak; }
    // Implementace výpočtu: Cena klesá s wear, StatTrak ji zvyšuje o 50 %
    calculateSellPrice() {
        const wearMultiplier = 1 - (this._wear * 0.7); // I nejvíc zničená zbraň má 30 % ceny
        let finalPrice = this._basePrice * wearMultiplier;
        if (this._isStatTrak) {
            finalPrice *= 1.5;
        }
        return Math.round(finalPrice * 100) / 100; // Zaokrouhlení na 2 desetinná místa
    }
}
