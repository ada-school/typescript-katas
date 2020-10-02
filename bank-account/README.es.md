# Kata Typescript: Cuenta Bancaria

[English](README.md) 🇺🇸 | [Español](README.es.md) 🇨🇴

## TDD con estilo

Como buena práctica y estándar de la industria haremos [TDD](https://en.wikipedia.org/wiki/Test-driven_development), para ejecutar las pruebas puedes ejecutar el siguiente comando:

```
yarn test
```

## Restricciones de la Kata

- [Ping Pong mudo](https://kata-log.rocks/mute-ping-pong)
- Ping Pong (igual que ping pong pero hablando)
- [Mob programming](https://kata-log.rocks/mob-programming)
  - Round Robin
  - Conductor@ designad@s

## Reglas del desafío 1

- Los depósitos y retiros se pueden realizar en una cuenta
- Cada depósito o retiro tendrá el monto de la operación y la fecha de la operación
- Debería poder transferir entre cuentas. Una transferencia aparecerá como un retiro en la cuenta del cedente y como un depósito en la cuenta del cesionario.
- Se puede solicitar una declaración en cualquier momento. El estado de cuenta contendrá para cada entrada la fecha, el monto del estado de cuenta y el saldo de la cuenta después de la entrada.

## Reglas del desafío 2

- Debería poder filtrar el estado de cuenta (solo depósitos, solo retiros, fecha)
- Debes almacenar las declaraciones en una base de datos

## Estándares de codificación

### Sin estado mutable

### Las funciones deben tener un máximo de 50 líneas

### Las funciones de prueba deben tener un máximo de 30 líneas de longitud

### Una afirmación por prueba

### Siempre usa la expresión de función y usa los tipos

**Malo: ⛔️**

```javascript
function addRoverToGame(game: Game, rover: Rover): Game {
  return addToGame("r", game, rover.coordinate);
}
```

**Bueno: ✅**

```javascript
type AddRovertoGame = (game: Game, rover: Rover) => Game;

const addRoverToGame: AddRovertoGame = (game, rover) => {
  return addToGame("r", game, rover.coordinate);
};
```

### Nombra todo (significativo, facil de buscar, explicativo)

**Malo: ⛔️**

```javascript
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
```

**Bueno: ✅**

```javascript
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 86400000;

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### Las funciones no deben aceptar ningún argumento booleano

**Malo: ⛔️**

```javascript
const effectiveDate = isBourquin => {
  if (isBourquin) {
    ...
  }
}
```

**Bueno: ✅**

```javascript
const bourquinEffectiveDate = () {
  ...
}
```

### Encapsular condicionales

**Malo: ⛔️**

```javascript
if (keyCode >= 48 && keyCode <= 57) {
  ...
}
```

**Bueno: ✅**

```javascript
const isNumberKeyPressed = keyCode => {
  return keyCode >= 48 && keyCode <= 57;
}

if (isNumberKeyPressed(keyCode)) {
  ...
}
```

### Evita las condicionales negativas

**Malo: ⛔️**

```javascript
const isDOMNodeNotPresent = (node) => {
  // ...
};

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Bueno: ✅**

```javascript
const isDOMNodePresent = (node) => {
  // ...
};

if (isDOMNodePresent(node)) {
  // ...
}
```

### Usa argumentos predeterminados en lugar de cortocircuitos o condicionales

**Malo: ⛔️**

```javascript
const createMicrobrewery = (name) => {
  const breweryName = name || "Hipster Brew Co.";
  // ...
};
```

**Bueno: ✅**

```javascript
const createMicrobrewery = (name = "Hipster Brew Co.") => {
  // ...
};
```

### Pon siempre los parámetros predeterminados al final

**Malo: ⛔️**

```javascript
const handleThings = (opts = {}, name) => {
  // ...
};
```

**Bueno: ✅**

```javascript
const handleThings = (name, opts = {}) => {
  // ...
};
```

### Nunca cambies (mutar) los parámetros

**Malo: ⛔️**

```javascript
const f1 = (obj) => {
  obj.key = 1;
};
```

**Bueno: ✅**

```javascript
const f2 = (obj) => {
  const newObj = {
    ...obj,
    key: 1,
  };
};
```
