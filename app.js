import { chromaCaseRegistry } from "./Data.js";
import { User } from "./user.js";
import { Case } from "./Case.js";
// 1. Inicializace: Vytvoříme uživatele s balancem $200 
const player = new User(200);
// 2. Vytvoříme bednu "Chroma Case", která stojí $2.50 a obsahuje skiny z registru 
const chromaCase = new Case("Chroma Case", 2.50, chromaCaseRegistry);
console.log("ZAČÁTEK SIMULACE OTEVÍRÁNÍ BEDEN");
console.log(`Počáteční stav peněženky hráče: $${player.balance}`);
// 3. Simulace: Hráč otevře 5 beden za sebou 
console.log("Otevírám bedny");
for (let i = 0; i < 5; i++) {
    player.buyCase(chromaCase); // Automaticky strhne peníze a přidá náhodný skin do inventáře
}
// 4. Výpis inventáře
console.log("AKTUÁLNÍ OBSAH INVENTÁŘE");
if (player.inventory.length === 0) {
    console.log("Inventář je prázdný.");
}
else {
    player.inventory.forEach((item, index) => {
        // Využití polymorfismu pro zjištění aktuální ceny s opotřebením
        const currentPrice = item.calculateSellPrice();
        const statTrakText = item.isStatTrak ? " [StatTrak™]" : "";
        console.log(`[${index + 1}] ${item.name}${statTrakText}\n` +
            `     Rarita: ${item.rarity} | Opotřebení (wear): ${item.wear}\n` +
            `     Základní hodnota: $${item.basePrice} | Aktuální cena: $${currentPrice}`);
    });
}
console.log(`\nZůstatek v peněžence po otevírání: $${player.balance.toFixed(2)}`);
// 5. Prodej všeho
// Projdeme pole a u každého skinu (ať zbraň nebo nůž) zavoláme prodejní metodu
player.sellAllInventory();
console.log(`%cKonečný zůstatek po prodeji všech skinů: $${player.balance.toFixed(2)}`);
