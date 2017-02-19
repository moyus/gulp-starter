"use strict";

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
'use strict';

var $luckyText = document.getElementById('lucky');
var $luckyLink = document.querySelector('.js-lucky');
function updateLuckyNumber() {
  var n = random(1, 9);
  $luckyText.innerText = n;
}

$luckyLink.addEventListener('click', function (e) {
  e.preventDefault();
  updateLuckyNumber();
});

updateLuckyNumber();
//# sourceMappingURL=bundle.js.map
