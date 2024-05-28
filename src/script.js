const billAmountInput = document.querySelector('#Bill-amount');
const tipPercentageButtons = document.querySelectorAll('.tip-selection');
const tipAmountResult = document.querySelector('.tip-amount-result');
function calculateTip(e) {
  e.preventDefault();
  const tipPercentage = Number((e.target.textContent).slice(0, -1));
  const billAmount = billAmountInput.value;
  const tipAmount = (billAmount*tipPercentage)/100;
  tipAmountResult.textContent = tipAmount;
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click',calculateTip);
});
