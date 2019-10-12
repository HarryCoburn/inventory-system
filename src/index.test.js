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
  console.log('Numtest', numTest);
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
  console.log('Numtest', numTest);
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
  testObj.add(testItem2);
  testObj.add(testItem2);
  testObj.drop('test');
  testObj.drop('test2');

  expect(testObj.inv).toStrictEqual([{ name: 'test2', number: 1 }]);
});
