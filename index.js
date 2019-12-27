function validate(input) {
  try {
    var nric = input.toUpperCase();

    if (nric.length !== 9) {
      return false;
    }

    var pre = nric.slice(0, 1);
    var digits = nric
      .slice(1, 8)
      .split('')
      .map(function(num) {
        return parseInt(num);
      });

    if (
      !digits.every(function(x) {
        return !isNaN(x);
      })
    ) {
      return false;
    }

    var checkdigit = nric.slice(8, 9).toUpperCase();
    return checkdigit == getCheckDigit(pre, digits);
  } catch (e) {
    return false;
  }
}

var listOfNRICs = [];

function generateNRIC() {
  function generateRandomNRIC() {
    var letters = ['S', 'T'];
    var pre = letters[getRandomInt(0, 2)];
    var digitString = getRandomInt(1000000, 9999999).toString();
    var digits = digitString.split('').map(function(num) {
      return parseInt(num);
    });
    var checkdigit = getCheckDigit(pre, digits);
    return ''
      .concat(pre)
      .concat(digitString)
      .concat(checkdigit);
  }

  var nric = generateRandomNRIC();

  while (listOfNRICs.indexOf(nric) !== -1) {
    nric = generateRandomNRIC();
  }

  listOfNRICs.push(nric);
  return nric;
}

var listOfFINs = [];

function generateFIN() {
  function generateRandomFIN() {
    var letters = ['F', 'G'];
    var pre = letters[getRandomInt(0, 2)];
    var digitString = getRandomInt(1000000, 9999999).toString();
    var digits = digitString.split('').map(function(num) {
      return parseInt(num);
    });
    var checkdigit = getCheckDigit(pre, digits);
    return ''
      .concat(pre)
      .concat(digitString)
      .concat(checkdigit);
  }

  var fin = generateRandomFIN();

  while (listOfFINs.indexOf(fin) !== -1) {
    fin = generateRandomFIN();
  }

  listOfFINs.push(fin);
  return fin;
}

function getCheckDigit(pre, digits) {
  var weights = [2, 7, 6, 5, 4, 3, 2];
  var checkST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  var checkFG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
  var sum = 0;

  for (var i = 0; i < digits.length; i++) {
    sum += digits[i] * weights[i];
  }

  var offset = pre == 'T' || pre == 'G' ? 4 : 0;
  var dValue = (sum + offset) % 11;

  if (pre == 'S' || pre == 'T') {
    return checkST[dValue];
  } else if (pre == 'F' || pre == 'G') {
    return checkFG[dValue];
  } else {
    return false;
  }
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  validate: validate,
  generateNRIC: generateNRIC,
  generateFIN: generateFIN
};
