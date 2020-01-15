const Checkout = require('./checkout');

const exampleRules = [
  { type: 'quantity', itemIdentifier: 'A', threshold: 3, adjustment: 15 },
  { type: 'quantity', itemIdentifier: 'B', threshold: 2, adjustment: 5 },
  { type: 'total', threshold: 150, adjustment: 20}
]

const exampleItemA = { identifier: 'A', price: 30 };
const exampleItemB = { identifier: 'B', price: 20 };
const exampleItemC = { identifier: 'C', price: 50 };
const exampleItemD = { identifier: 'D', price: 15 };

test('is initialized with an empty ruleset if no rules provided', () => {
  let co = new Checkout();

  expect(co.rules).toEqual([]);
})

test('returns an empty array of cart items on newly instantiated checkout', () => {
  let co = new Checkout();
  expect(co.cartItems).toEqual([]);
});

test('scan() adds the item to the cart items array if no reference is found', () => {
  let co = new Checkout();
  co.scan(exampleItemA);

  expect(co.cartItems.length).toEqual(1);
  expect(co.cartItems[0].quantity).toEqual(1);
});

test('scan() updates the item quantity if a reference is found', () => {
  let co = new Checkout();
  co.scan(exampleItemA);
  co.scan(exampleItemA);

  expect(co.cartItems.length).toEqual(1);
  expect(co.cartItems[0].quantity).toEqual(2);
});

test('without items: total() returns the calculated cart total', () => {
  let co = new Checkout();

  expect(co.total()).toEqual(0);
})

test('without rules: total() returns the calculated cart total', () => {
  let co = new Checkout();
  co.scan(exampleItemA);
  co.scan(exampleItemA);

  expect(co.total()).toEqual(60);
})

test('with rules: total() returns the calculated cart total', () => {
  let co = new Checkout(exampleRules);
  co.scan(exampleItemA);
  co.scan(exampleItemA);
  co.scan(exampleItemA);

  expect(co.total()).toEqual(75);
})

test('provided example test data: basket A, B, C', () => {
  let co = new Checkout(exampleRules);
  co.scan(exampleItemA);
  co.scan(exampleItemB);
  co.scan(exampleItemC);

  expect(co.total()).toEqual(100);
})

test('provided example test data: basket B, A, B, A, A', () => {
  let co = new Checkout(exampleRules);
  co.scan(exampleItemB);
  co.scan(exampleItemA);
  co.scan(exampleItemB);
  co.scan(exampleItemA);
  co.scan(exampleItemA);

  expect(co.total()).toEqual(110);
})

test('provided example test data: basket C, B, A, A, D, A, B', () => {
  let co = new Checkout(exampleRules);
  co.scan(exampleItemC);
  co.scan(exampleItemB);
  co.scan(exampleItemA);
  co.scan(exampleItemA);
  co.scan(exampleItemD);
  co.scan(exampleItemA);
  co.scan(exampleItemB);

  expect(co.total()).toEqual(155);
})

test('provided example test data: basket C, A, D, A, A', () => {
  let co = new Checkout(exampleRules);
  co.scan(exampleItemC);
  co.scan(exampleItemA);
  co.scan(exampleItemD);
  co.scan(exampleItemA);
  co.scan(exampleItemA);

  expect(co.total()).toEqual(140);
})