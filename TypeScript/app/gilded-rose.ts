import { isString } from "util";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    decrementItemSellIn(item: Item): Item {
        if (item.name != 'Sulfuras') {
            item.sellIn -= 1;
        }
        return item;
    }

    adjustItemQualityByAmount(item: Item, amount: number): Item {
        item.quality += amount;
        if (item.quality > 50) {
            item.quality = 50;
        }
        if (item.quality < 0) {
            item.quality = 0;
        }

        return item;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            const itemName = this.items[i].name;

            switch (itemName) {
                case 'Aged Brie':
                    if (item.sellIn > 0) {
                        item = this.adjustItemQualityByAmount(item, 1);
                    } else {
                        item = this.adjustItemQualityByAmount(item, 2);
                    }
                    break;
                case 'Backstage passes':
                    if (item.sellIn > 10) {
                        item = this.adjustItemQualityByAmount(item, 1);
                    }
                    if (item.sellIn <= 10 && item.sellIn > 5) {
                        item = this.adjustItemQualityByAmount(item, 2);
                    }
                    if (item.sellIn <= 5) {
                        item = this.adjustItemQualityByAmount(item, 3);
                    }
                    if (item.sellIn <= 0) {
                        item.quality = 0;
                    }
                    break;
                case 'Sulfuras':
                    break;
                default:
                    if (item.sellIn > 0) {
                        item = this.adjustItemQualityByAmount(item, -1);
                    } else {
                        item = this.adjustItemQualityByAmount(item, -2);
                    }
                    
            }

            item = this.decrementItemSellIn(item);
            this.items[i] = item;
        }

        return this.items;
    }
}
