import { GameItem } from "./GameItem.js";

export class WeaponSkin extends GameItem {
    private _isStatTrak: boolean;

    constructor(id: string, name: string, rarity: string, basePrice: number, wear: number, isStatTrak: boolean) {
        super(id, name, rarity, basePrice, wear);
        this._isStatTrak = isStatTrak;
    }

    public get isStatTrak(): boolean { return this._isStatTrak; }

    // Implementace výpočtu: Cena klesá s wear, StatTrak ji zvyšuje o 50 %
    public calculateSellPrice(): number {
        const wearMultiplier = 1 - (this._wear * 0.7); // I nejvíc zničená zbraň má 30 % ceny
        let finalPrice = this._basePrice * wearMultiplier;

        if (this._isStatTrak) {
            finalPrice *= 1.5;
        }

        return Math.round(finalPrice * 100) / 100; // Zaokrouhlení na 2 desetinná místa
    }
}