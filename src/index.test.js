import { Inventory } from './index.js';
import { exportAllDeclaration } from '@babel/types';

test('Inventory is empty on creation.', () => {
  let testObj = new Inventory();
  expect(testObj.inv).toStrictEqual([]);
});

test('Item can be added to inventory successfully.', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'test'
  };
  testObj.add(testItem);

  let numTest = testObj.inv.find(item => {
    return item.name === 'test';
  });

  expect(testObj.inv).toStrictEqual([testItem]);
  expect(numTest.number).toBe(1);
});

test('Existing item gets incremented when one more is added', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'test'
  };
  testObj.add(testItem);
  testObj.add(testItem);

  let numTest = testObj.inv.find(item => {
    return item.name === 'test';
  });

  expect(numTest.number).toBe(2);
});

test('Existing item gets incremented when more than one is added', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'test'
  };
  testObj.add(testItem);
  testObj.add(testItem, 3);

  let numTest = testObj.inv.find(item => {
    return item.name === 'test';
  });
  expect(numTest.number).toBe(4);
});

test('Item can be dropped and decremented from inventory successfully.', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'test'
  };
  let testItem2 = {
    name: 'test2'
  };
  testObj.add(testItem);
  testObj.add(testItem2, 2);
  testObj.drop('test');
  testObj.drop('test2');

  expect(testObj.inv).toStrictEqual([{ name: 'test2', number: 1 }]);
});

test('More than one of the same item can be dropped at once.', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'test'
  };

  testObj.add(testItem, 3);
  testObj.drop('test', 2);
  expect(testObj.inv).toStrictEqual([{ name: 'test', number: 1 }]);

  testObj.drop('test', 2);
  expect(testObj.inv).toStrictEqual([]);
});

test('Inventory is sorted by item name in alphabetical order.', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'Alpha'
  };
  let testItem2 = {
    name: 'Zeta'
  };

  testObj.add(testItem2);
  testObj.add(testItem);

  expect(testObj.inv[0]['name']).toBe('Alpha');
  expect(testObj.inv[1]['name']).toBe('Zeta');
});

test('Inventory prints correctly', () => {
  let testObj = new Inventory();
  let testItem = {
    name: 'Alpha'
  };
  let testItem2 = {
    name: 'Zeta'
  };

  testObj.add(testItem2, 2);
  testObj.add(testItem);

  expect(testObj.print()).toBe('Alpha: 1\nZeta: 2\n');
});
