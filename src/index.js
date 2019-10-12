export class Inventory {
  constructor() {
    this._inv = [];
  }

  get inv() {
    return this._inv;
  }

  add(item) {
    let alreadyExists = this._inv.find(inv => inv.name === item.name);
    if (alreadyExists === undefined) {
      item.number = 1;
      this._inv.push(item);
    } else {
      console.log(alreadyExists);
      alreadyExists.number++;
    }
  }

  drop(item) {
    let toBeDropped = this._inv.find(inv => inv.name === item);
    if (toBeDropped.number === 1) {
      this._inv = this._inv.filter(inv => inv.name !== item);
    } else {
      toBeDropped.number--;
    }
  }
}
