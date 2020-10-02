# Typescript Kata : Bank Account

[English](README.md) 🇺🇸 | [Español](README.es.md) 🇨🇴

## Initial Resources

You will find the initial configuration for running [tests](index.test.ts) and some [models](src/models.d.ts) already provided.

## TDD style

As a good practice and industry standard we will do [TDD](https://en.wikipedia.org/wiki/Test-driven_development), in order to run the tests you can run the following command:

```
yarn test
```

## Kata constraints

- [Mute Ping Pong](https://kata-log.rocks/mute-ping-pong)
- Ping Pong (same as ping pong but talking)
- [Mob programming](https://kata-log.rocks/mob-programming)
  - Round Robin
  - Designated Driver

## Challenge 1 rules

- Deposits and withdrawals can be maded into an account
- Each deposit or withdrawal will have the amount of the operation and the date of the operation
- You should be able to transfer between accounts. A transfer will appear as a withdrawal in the account of the transferor and as a deposit on the account of the transferee.
- A statement can be requested at any time. The statement will contain for each entry the date, the amount of the statement, and the balance of the account after the entry.

## Challenge 2 rules

- You should be able to filter the statement (only deposits, only withdrawals, date)
- You should store the statements in a DB

## Coding Standards

### No mutable state

### Functions should be max 50 lines long

### Test functions should be max 30 lines long

### One assertion per test

### Always use function expression and type them

**Bad: ⛔️**

```javascript
function addRoverToGame(game: Game, rover: Rover): Game {
  return addToGame("r", game, rover.coordinate);
}
```

**Good: ✅**

```javascript
type AddRovertoGame = (game: Game, rover: Rover) => Game;

const addRoverToGame: AddRovertoGame = (game, rover) => {
  return addToGame("r", game, rover.coordinate);
};
```

### Name everything (meaningful, searchable, explanatory)

**Bad: ⛔️**

```javascript
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
```

**Good: ✅**

```javascript
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 86400000;

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### Functions should not take any boolean argument

**Bad: ⛔️**

```javascript
const effectiveDate = isBourquin => {
  if (isBourquin) {
    ...
  }
}
```

**Good: ✅**

```javascript
const bourquinEffectiveDate = () {
  ...
}
```

### Encapsulate conditionals

**Bad: ⛔️**

```javascript
if (keyCode >= 48 && keyCode <= 57) {
  ...
}
```

**Good: ✅**

```javascript
const isNumberKeyPressed = keyCode => {
  return keyCode >= 48 && keyCode <= 57;
}

if (isNumberKeyPressed(keyCode)) {
  ...
}
```

### Avoid negative conditionals

**Bad: ⛔️**

```javascript
const isDOMNodeNotPresent = (node) => {
  // ...
};

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Good: ✅**

```javascript
const isDOMNodePresent = (node) => {
  // ...
};

if (isDOMNodePresent(node)) {
  // ...
}
```

### Use default arguments instead of short circuiting or conditionals

**Bad: ⛔️**

```javascript
const createMicrobrewery = (name) => {
  const breweryName = name || "Hipster Brew Co.";
  // ...
};
```

**Good: ✅**

```javascript
const createMicrobrewery = (name = "Hipster Brew Co.") => {
  // ...
};
```

### Always put default parameters last

**Bad: ⛔️**

```javascript
const handleThings = (opts = {}, name) => {
  // ...
};
```

**Good: ✅**

```javascript
const handleThings = (name, opts = {}) => {
  // ...
};
```

### Never mutate parameters

**Bad: ⛔️**

```javascript
const f1 = (obj) => {
  obj.key = 1;
};
```

**Good: ✅**

```javascript
const f2 = (obj) => {
  const newObj = {
    ...obj,
    key: 1,
  };
};
```
