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

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const itemName = this.items[i].name;

            if (itemName != 'Aged Brie' && itemName != 'Backstage passes') {
                if (item.quality > 0) {
                    if (itemName != 'Sulfuras') {
                        item.quality = item.quality - 1
                    }
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (itemName == 'Backstage passes') {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                }
            }
            if (itemName != 'Sulfuras') {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (itemName != 'Aged Brie') {
                    if (itemName != 'Backstage passes') {
                        if (item.quality > 0) {
                            if (itemName != 'Sulfuras') {
                                item.quality = item.quality - 1
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }

            this.items[i] = item;
        }

        return this.items;
    }
}
