export abstract class GameItem {
    protected _id: string;
    protected _name: string;
    protected _rarity: string;
    protected _basePrice: number;
    protected _wear: number; // Hodnota 0.0 (Factory New) až 1.0 (Battle-Scarred)

    constructor(id: string, name: string, rarity: string, basePrice: number, wear: number) {
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

    public get id(): string { return this._id; }
    public get name(): string { return this._name; }
    public get rarity(): string { return this._rarity; }
    public get basePrice(): number { return this._basePrice; }
    public get wear(): number { return this._wear; }

    // Abstraktní metoda pro výpočet prodejní ceny
    public abstract calculateSellPrice(): number;
}