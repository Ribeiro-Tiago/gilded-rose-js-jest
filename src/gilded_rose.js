class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(value) {
    return Math.min(50, value);
  }

  decreaseQuality(value) {
    return Math.max(0, value);
  }

  getBackstagePassQuality(sellIn, quality) {
    if (sellIn === 0) {
      return 0;
    }

    if (sellIn <= 5) {
      return this.increaseQuality(quality + 3);
    }

    return this.increaseQuality(sellIn <= 10 ? quality + 2 : quality + 1);
  }

  updateQuality() {
    let item, name, degradation;
    for (item of this.items) {
      name = item.name.toLowerCase();
      degradation = item.sellIn === 0 || name.includes("conjured") ? 2 : 1;

      if (name.includes("sulfuras")) {
        continue;
      }

      if (item.sellIn > 0) {
        item.sellIn--;
      }

      if (name.includes("aged brie")) {
        item.quality = this.increaseQuality(item.quality + degradation);
        continue;
      }

      if (name.includes("backstage pass")) {
        item.quality = this.getBackstagePassQuality(item.sellIn, item.quality);
        continue;
      }

      item.quality = this.decreaseQuality(item.quality - degradation);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
