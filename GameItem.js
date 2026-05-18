export class GameItem {
    _id;
    _name;
    _rarity;
    _basePrice;
    _wear; // Hodnota 0.0 (Factory New) až 1.0 (Battle-Scarred)
    constructor(id, name, rarity, basePrice, wear) {
        if (!id.trim() || !name.trim() || !rarity.trim()) {
            throw new Error("ID, název ani vzácnost nesmí být prázdné řetězce.");
        }
        if (basePrice < 0) {
            throw new Error("Základní cena nesmí být záporná.");
        }
        if (wear < 0 || wear > 1) {
            throw new Error("Opotřebení (wear) musí být v rozmezí od 0 do 1.");
        }
        this._id = id;
        this._name = name;
        this._rarity = rarity;
        this._basePrice = basePrice;
        this._wear = wear;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get rarity() { return this._rarity; }
    get basePrice() { return this._basePrice; }
    get wear() { return this._wear; }
}
