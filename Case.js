import { WeaponSkin } from "./WeaponSkin.js";
import { KnifeSkin } from "./KnifeSkin.js";
export class Case {
    _caseName;
    _price;
    _possibleDrops; // Seznam dat, ze kterých generujeme skiny při open()
    constructor(caseName, price, possibleDrops) {
        if (!caseName.trim())
            throw new Error("Název bedny nesmí být prázdný.");
        if (price < 0)
            throw new Error("Cena bedny nesmí být záporná.");
        if (possibleDrops.length === 0)
            throw new Error("Bedna musí obsahovat alespoň jeden předmět.");
        this._caseName = caseName;
        this._price = price;
        this._possibleDrops = possibleDrops;
    }
    get caseName() { return this._caseName; }
    get price() { return this._price; }
    // Metoda simulující náhodný drop
    open() {
        // Vybereme náhodný drop
        const randomIndex = Math.floor(Math.random() * this._possibleDrops.length);
        const itemData = this._possibleDrops[randomIndex];
        // Nasimulujeme náhodné opotřebení od 0.0 do 1.0 pro tento předmět
        const randomWear = Math.round(Math.random() * 100) / 100;
        // Náhodně určíme, zda bude zbraň StatTrak (šance např. 10 %)
        const randomStatTrak = Math.random() < 0.10;
        if (itemData.type === "weapon") {
            return new WeaponSkin(itemData.id + "_" + Date.now(), itemData.name, itemData.rarity, itemData.basePrice, randomWear, randomStatTrak);
        }
        else {
            return new KnifeSkin(itemData.id + "_" + Date.now(), itemData.name, itemData.rarity, itemData.basePrice, randomWear, randomStatTrak);
        }
    }
}
