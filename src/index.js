export class Inventory {
  constructor() {
    this._inv = [];
  }

  get inv() {
    return this._inv;
  }

  add(item, num = 1) {
    let alreadyExists = this._inv.find(inv => inv.name === item.name);
    if (alreadyExists === undefined) {
      item.number = num;
      this._inv.push(item);
      this.sortInv();
    } else {
      alreadyExists.number += num;
    }
  }

  drop(item, num = 1) {
    let toBeDropped = this._inv.find(inv => inv.name === item);
    if (toBeDropped.number <= num) {
      this._inv = this._inv.filter(inv => inv.name !== item);
      this.sortInv();
    } else {
      toBeDropped.number -= num;
    }
  }

  sortInv() {
    this._inv.sort((a, b) => a.name.localeCompare(b.name));
  }

  print() {
    let output = '';
    this._inv.forEach(item => {
      output += `${item.name}: ${item.number}\n`;
    });
    return output;
  }

  use(item) {
    let toBeUsed = this._inv.find(inv => inv.name === item);
    if (toBeUsed === undefined) throw "Tried to use item that wasn't in the inventory";
    let callback = toBeUsed.useFunc;
    this.drop(toBeUsed.name);
    return (function() {
      return callback(toBeUsed.args);
    })();
  }
}
