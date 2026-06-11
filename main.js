import { chromaCaseRegistry } from './Data.js';
import { User }  from './User.js';
import { Case }  from './Case.js';

const player      = new User(200);
const chromaCase  = new Case('Chroma Case', 2.50, chromaCaseRegistry);

const balanceEl   = document.getElementById('balance-display');
const caseNameEl  = document.getElementById('case-name');
const casePriceEl = document.getElementById('case-price');
const btnOpen     = document.getElementById('btn-open');
const btnSellAll  = document.getElementById('btn-sell-all');
const lastDropEl  = document.getElementById('last-drop');
const gridEl      = document.getElementById('inventory-grid');
const invCountEl  = document.getElementById('inv-count');

const RARITY_MAP = {
    'Consumer Grade':   { hex: '#b0c3d9', rgb: '176,195,217' },
    'Industrial Grade': { hex: '#5e98d9', rgb: '94,152,217'  },
    'Mil-Spec':         { hex: '#4b69ff', rgb: '75,105,255'  },
    'Restricted':       { hex: '#8847ff', rgb: '136,71,255'  },
    'Classified':       { hex: '#d32ce6', rgb: '211,44,230'  },
    'Covert':           { hex: '#eb4b4b', rgb: '235,75,75'   },
    'Special Rare':     { hex: '#e4ae39', rgb: '228,174,57'  },
};

function rarityStyle(rarity) {
    return RARITY_MAP[rarity] ?? { hex: '#5a6a7a', rgb: '90,106,122' };
}

function wearLabel(w) {
    if (w < 0.07) return 'Factory New';
    if (w < 0.15) return 'Minimal Wear';
    if (w < 0.38) return 'Field-Tested';
    if (w < 0.45) return 'Well-Worn';
    return 'Battle-Scarred';
}

function render() {
    // zustatek
    balanceEl.textContent = `$${player.balance.toFixed(2)}`;

    // info bedna
    caseNameEl.textContent  = chromaCase.caseName;
    casePriceEl.textContent = `$${chromaCase.price.toFixed(2)}`;

    // open btn
    btnOpen.disabled = player.balance < chromaCase.price;

    // sell all btn
    btnSellAll.disabled = player.inventory.length === 0;

    // pocet itemu v inventari
    invCountEl.textContent = `(${player.inventory.length})`;

    // grid
    gridEl.innerHTML = '';

    if (player.inventory.length === 0) {
        gridEl.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🎒</span>
                Inventář je prázdný – otevři bednu!
            </div>`;
        return;
    }

    player.inventory.forEach((item, idx) => {
        const { hex, rgb } = rarityStyle(item.rarity);
        const sellPrice    = item.calculateSellPrice();
        const isStatTrak   = item.isStatTrak ?? false;
        const wear         = item.wear;

        const card = document.createElement('div');
        card.className = 'item-card';
        card.style.setProperty('--rarity-color', hex);
        card.style.setProperty('--rarity-rgb', rgb);

        card.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-badges">
                <span class="badge badge-rarity">${item.rarity}</span>
                ${isStatTrak ? '<span class="badge badge-stattrak">StatTrak™</span>' : ''}
                <span class="badge badge-wear">${wearLabel(wear)}</span>
            </div>
            <div class="wear-bar-track">
                <div class="wear-bar-fill" style="width:${Math.round(wear * 100)}%"></div>
            </div>
            <div class="item-prices">
                <span class="price-base">Základ: $${item.basePrice}</span>
                <span class="price-sell">$${sellPrice}</span>
            </div>
            <button class="btn-sell-item" data-idx="${idx}">Prodat</button>
        `;
        gridEl.appendChild(card);
    });
}

btnOpen.addEventListener('click', () => {
    const prevLen = player.inventory.length;
    player.buyCase(chromaCase);

    if (player.inventory.length > prevLen) {
        const item       = player.inventory[player.inventory.length - 1];
        const { hex }    = rarityStyle(item.rarity);
        const isStatTrak = item.isStatTrak ?? false;
        lastDropEl.style.color = hex;
        lastDropEl.textContent =
            `🎉 Získal jsi: ${item.name}${isStatTrak ? ' [StatTrak™]' : ''} — ${item.rarity}`;
        lastDropEl.className = 'show';
    } else {
        lastDropEl.style.color = '';
        lastDropEl.textContent = '⚠️ Nedostatek peněz na otevření bedny.';
        lastDropEl.className   = 'show';
    }

    render();
});

btnSellAll.addEventListener('click', () => {
    player.sellAllInventory();
    lastDropEl.style.color = '';
    lastDropEl.textContent = '💰 Vše prodáno!';
    lastDropEl.className   = 'show';
    render();
});

gridEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-sell-item');
    if (!btn) return;
    const idx  = parseInt(btn.dataset.idx, 10);
    const item = player.inventory[idx];
    if (!item) return;
    const sellPrice = item.calculateSellPrice();
    lastDropEl.style.color = '';
    lastDropEl.textContent = `💸 Prodáno: ${item.name} za $${sellPrice}`;
    lastDropEl.className   = 'show';
    player.sellItem(item);
    render();
});

render();
