# Kata Typescript: Cuenta Bancaria

[English](README.md) 🇺🇸 | [Español](README.es.md) 🇨🇴

## ¿Cómo empezar?

1. Lee los desafíos, decide por **uno**
2. Seleccione **una** restricción de la Kata
3. Empieca a utilizar **TDD** y ten en cuenta los estándares de codificación
4. ¡**Diviértete!**

## TDD con estilo

Como buena práctica y estándar de la industria haremos [TDD](https://en.wikipedia.org/wiki/Test-driven_development), para ejecutar las pruebas puedes ejecutar el siguiente comando:

```shell
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

**Mal: ⛔️**

```javascript
function addRoverToGame(game: Game, rover: Rover): Game {
  return addToGame("r", game, rover.coordinate);
}
```

**Bien: ✅**

```javascript
type AddRovertoGame = (game: Game, rover: Rover) => Game;

const addRoverToGame: AddRovertoGame = (game, rover) => {
  return addToGame("r", game, rover.coordinate);
};
```

### Nombra todo (significativo, facil de buscar, explicativo)

**Mal: ⛔️**

```javascript
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
```

**Bien: ✅**

```javascript
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 86400000;

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### Las funciones no deben aceptar ningún argumento booleano

**Mal: ⛔️**

```javascript
const effectiveDate = isBourquin => {
  if (isBourquin) {
    ...
  }
}
```

**Bien: ✅**

```javascript
const bourquinEffectiveDate = () {
  ...
}
```

### Encapsular condicionales

**Mal: ⛔️**

```javascript
if (keyCode >= 48 && keyCode <= 57) {
  ...
}
```

**Bien: ✅**

```javascript
const isNumberKeyPressed = keyCode => {
  return keyCode >= 48 && keyCode <= 57;
}

if (isNumberKeyPressed(keyCode)) {
  ...
}
```

### Evita las condicionales negativas

**Mal: ⛔️**

```javascript
const isDOMNodeNotPresent = (node) => {
  // ...
};

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Bien: ✅**

```javascript
const isDOMNodePresent = (node) => {
  // ...
};

if (isDOMNodePresent(node)) {
  // ...
}
```

### Usa argumentos predeterminados en lugar de cortocircuitos o condicionales

**Mal: ⛔️**

```javascript
const createMicrobrewery = (name) => {
  const breweryName = name || "Hipster Brew Co.";
  // ...
};
```

**Bien: ✅**

```javascript
const createMicrobrewery = (name = "Hipster Brew Co.") => {
  // ...
};
```

### Pon siempre los parámetros predeterminados al final

**Mal: ⛔️**

```javascript
const handleThings = (opts = {}, name) => {
  // ...
};
```

**Bien: ✅**

```javascript
const handleThings = (name, opts = {}) => {
  // ...
};
```

### Nunca cambies (mutar) los parámetros

**Mal: ⛔️**

```javascript
const f1 = (obj) => {
  obj.key = 1;
};
```

**Bien: ✅**

```javascript
const f2 = (obj) => {
  const newObj = {
    ...obj,
    key: 1,
  };
};
```
