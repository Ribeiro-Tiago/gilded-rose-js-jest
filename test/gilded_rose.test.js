const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("tests sellIn and quality limits", function () {
    const gildedRose = new Shop([
      new Item("foo", 0, 0),
      new Item("aged brie", 20, 50),
    ]);
    const items = gildedRose.updateQuality();

    // sellIn and quality shouldn't be negative
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);

    // quality shouldn't be more than 50
    expect(items[1].quality).toBe(50);
    expect(items[1].sellIn).toBe(19);
  });

  it("should degrate quality twice as quickly", function () {
    const gildedRose = new Shop([new Item("foo", 0, 6)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
  });

  it("should increase quality as expires", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 3)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(4);
  });

  test("sulfuras shouldn't decrease quality or need to be sold", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(80);
  });

  test("backstage passes possibilities", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 7),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    const items = gildedRose.updateQuality();

    // check quality increasing
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(6);

    // check quality increasing by 2
    expect(items[1].sellIn).toBe(8);
    expect(items[1].quality).toBe(9);

    // // check quality increasing by 3
    expect(items[2].sellIn).toBe(3);
    expect(items[2].quality).toBe(13);

    // check quality 0
    expect(items[3].sellIn).toBe(0);
    expect(items[3].quality).toBe(0);
  });

  it("should degrade twice as fast if conjured", function () {
    const gildedRose = new Shop([new Item("Conjured: something", 1, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(18);
  });
});
