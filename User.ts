import { GameItem } from "./GameItem.js";
import { Case } from "./Case.js";

export class User {
    private _inventory: GameItem[] = [];
    private _balance: number; 

    constructor(initialBalance: number) {
        if (initialBalance < 0) {
            throw new Error("Počáteční zůstatek nesmí být záporný.");
        }
        this._balance = initialBalance;
    }

    public get inventory(): GameItem[] { return this._inventory; }
    public get balance(): number { return this._balance; }

    // Metoda pro nákup a automatické otevření bedny
    public buyCase(targetCase: Case): void {
        if (this._balance < targetCase.price) {
            console.log(`Nedostatek peněz na nákup bedny ${targetCase.caseName}! Chybí vám $${(targetCase.price - this._balance).toFixed(2)}`);
            return;
        }

        // Odečtení peněz 
        this._balance -= targetCase.price;
        console.log(`Koupil jsi bednu ${targetCase.caseName} za $${targetCase.price}. Zůstatek: $${this._balance.toFixed(2)}`);

        // Otevření bedny a získání skinu 
        const droppedItem = targetCase.open();
        this._inventory.push(droppedItem); // 
        
        console.log(`Z bedny ti vypadl skin: ${droppedItem.name} (${droppedItem.rarity})!`);
    }

    // Prodej konkrétního předmětu zpět systému
    public sellItem(item: GameItem): void {
        const index = this._inventory.indexOf(item);
        if (index === -1) {
            console.log("Tento předmět v inventáři nemáš.");
            return;
        }

        // Polymorfismus v akci při výpočtu prodejní ceny 
        const sellPrice = item.calculateSellPrice();
        this._balance += sellPrice;
        
        // Odstranění z inventáře
        this._inventory.splice(index, 1);
        console.log(`Prodal jsi ${item.name} za $${sellPrice}. Nový zůstatek: $${this._balance.toFixed(2)}`);
    }

    // Pomocná metoda pro prodej všeho
    public sellAllInventory(): void {
        console.log("Prodáváš celý inventář");
        // Musíme jít od konce, protože pole za jízdy mažeme
        for (let i = this._inventory.length - 1; i >= 0; i--) {
            this.sellItem(this._inventory[i]);
        }
    }
}