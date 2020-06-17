import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('should degrade an item sellIn by 1 daily', () => {
        const gildedRose = new GildedRose([new Item('foo', 5, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
    });

    it('should degrade an item quality by 1 when the sellIn date is not passed', () => {
        const gildedRose = new GildedRose([new Item('foo', 1, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
    });

    it('should degrade an item quality by 2 when the sellIn date is passed', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
    });

    it('should not degrade quality below 0', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should increase quality of Aged Brie by 1 as sellIn approaches', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(6);
    });

    it('should increase quality of Aged Brie by 2 as sellIn < 0 ', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
    });

    it('should not increase quality of Aged Brie above 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    it('should not degrade Sulfuras quality or sellIn', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras', 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });

    it('should increase Backstage passes quality by 1 when sellIn >10', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes', 11, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(6);
    });

    it('should increase Backstage passes quality by 2 when sellIn <= 10 but > 5', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes', 10, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
    });

    it('should increase Backstage passes quality by 3 when sellIn <=5', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes', 5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
    });

    it('should drop Backstage passes quality to 0 when sellIn is <= 0', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes', 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

// All items have a SellIn value which denotes the number of days we have to sell the item
// All items have a Quality value which denotes how valuable the item is
// At the end of each day our system lowers both values for every item

// Once the sell by date has passed, Quality degrades twice as fast
// The Quality of an item is never negative
// “Aged Brie” actually increases in Quality the older it gets
// The Quality of an item is never more than 50
// “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
// “Backstage passes”, like aged brie, increases in Quality as it’s SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert