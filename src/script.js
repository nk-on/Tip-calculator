const billAmountInput = document.querySelector('#Bill-amount');
const tipPercentageButtons = document.querySelectorAll('.tip-selection');
const tipAmountResult = document.querySelector('.tip-amount-result');
const numberOfPeople = document.querySelector('#number-of-people');
const totalAmountResult = document.querySelector('.total-amount-result');
const customTip = document.querySelector('#custom-tip');
const resetButton = document.querySelector('.Reset-button');
function calculateTip(e) {
  e.preventDefault();
  let tipPercentage =
    e.target.textContent.length === 0
      ? customTip.value
      : Number(e.target.textContent.slice(0, -1));
  const billAmount = billAmountInput.value;
  const tipAmount = (billAmount * tipPercentage) / 100;
  if (billAmount.length === 0) {
    alert('Enter bill amount');
    return;
  }
  if (numberOfPeople.value.length === 0) {
    alert('Enter amount of people');
    return;
  }
  tipAmountResult.textContent = `${tipAmount}$`;
  calculateTotalAmount(tipAmount);
}
function calculateTotalAmount(tipAmount) {
  const totalAmount = tipAmount * Number(numberOfPeople.value);
  totalAmountResult.textContent = `${totalAmount.toFixed(2)}$`;
}
function clear() {
  billAmountInput.value = '';
  numberOfPeople.value = '';
  customTip.value = '';
  tipAmountResult.textContent = '';
  totalAmountResult.textContent = '';
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click', calculateTip);
});
resetButton.addEventListener('click', clear);
