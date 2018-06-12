(function () {
let radios = document.querySelectorAll('input[name=type]');
let weight = document.querySelector('input[name=weight]');

for (let radio of radios) {
  radio.addEventListener('change', checkValue);
}

function checkValue (e) {
  let value = e.target.value;
  if (value == 'stamped' || value == 'metered') {
    weight.max = 3.4;
  }
  else if (value == 'flats' || value == 'package') {
    weight.max = 12.9;
  }
}
})();