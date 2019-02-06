# nric

[![](https://img.shields.io/npm/v/nric.svg?style=flat)](https://github.com/danielkhoo/nric)
[![](https://img.shields.io/bundlephobia/min/nric.svg?style=flat)](https://github.com/danielkhoo/nric)

Utility to validate or generate Singapore NRIC numbers

## Install

`$ npm install nric`

## Usage

```js
const nric = require('nric')

nric.validate('S1234567A') //false

nric.validate('S9470855I') //true

nric.validate('T7123769E') //true

nric.generateNRIC() //e.g. S9470855I

nric.generateFIN() //e.g. G2943157X
```

## License

MIT
