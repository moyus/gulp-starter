const $luckyText = document.getElementById('lucky')
const $luckyLink = document.querySelector('.js-lucky')
function updateLuckyNumber() {
  const n = random(1, 9)
  $luckyText.innerText = n
}

$luckyLink.addEventListener('click', (e) => {
  e.preventDefault()
  updateLuckyNumber()
})

updateLuckyNumber()
