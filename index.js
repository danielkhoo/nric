module.exports = validate = input => {
  const nric = input.toUpperCase()
  console.log(nric)
  if (nric.length !== 9) {
    return false
  }
  const pre = nric.slice(0, 1)
  const digits = nric
    .slice(1, 8)
    .split('')
    .map(num => parseInt(num))
  if (!digits.every(x => !isNaN(x))) {
    return false
  }

  const checkdigit = nric.slice(8, 9).toUpperCase()
  return checkdigit == getCheckDigit(pre, digits)
}

module.exports = generateNRIC = () => {
  const letters = ['S', 'T']
  const pre = letters[getRandomInt(0, 2)]
  const digitString = getRandomInt(1000000, 9999999).toString()
  const digits = digitString.split('').map(num => parseInt(num))
  const checkdigit = getCheckDigit(pre, digits)
  return `${pre}${digitString}${checkdigit}`
}
module.exports = generateFIN = () => {
  const letters = ['F', 'G']
  const pre = letters[getRandomInt(0, 2)]
  const digitString = getRandomInt(1000000, 9999999).toString()
  const digits = digitString.split('').map(num => parseInt(num))
  const checkdigit = getCheckDigit(pre, digits)
  return `${pre}${digitString}${checkdigit}`
}

const getCheckDigit = (pre, digits) => {
  const weights = [2, 7, 6, 5, 4, 3, 2]
  const checkST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
  const checkFG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K']
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * weights[i]
  }
  const offset = pre == 'T' || pre == 'G' ? 4 : 0
  const dValue = (sum + offset) % 11

  if (pre == 'S' || pre == 'T') {
    return checkST[dValue]
  } else if (pre == 'F' || pre == 'G') {
    return checkFG[dValue]
  } else {
    return false
  }
}
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}
console.log(validate(generateNRIC()))
console.log(validate(generateNRIC()))
console.log(validate(generateNRIC()))
console.log(validate(generateNRIC()))
