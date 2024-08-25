const billInput = document.querySelector('#bill-input');
const tipPercentageButtons = document.querySelectorAll('.tip-percentage');
const customInput = document.querySelector('#custom-input');
const amountOfPeopleInput = document.querySelector('#number-of-people-input');
const tipAmountResultContainer = document.querySelector('.tip-amount-result');
const totalAmountContainer = document.querySelector('.total-amount-result');
function clearInputs() {
  billInput.value = '';
  amountOfPeopleInput.value = '';
  customInput.value = '';
}
function validateInput(billAmount, amountOfPeople) {
  if (isNaN(billAmount) || isNaN(amountOfPeople)) {
    alert('Enter valid number');
    return;
  }
}
function displayResults(tipAmount, totalAmount) {
  tipAmountResultContainer.textContent = `$ ${String(tipAmount)}`;
  totalAmountContainer.textContent = `$ ${String(totalAmount)}`;
}
function calculate(e) {
  e.preventDefault();
  const [billAmount, amountOfPeople] = [
    Number(billInput.value),
    Number(amountOfPeopleInput.value),
  ];
  validateInput(billAmount, amountOfPeople);
  const percentageAmount = isNaN(this.dataset.percentage)
    ? this.value
    : this.dataset.percentage;
  const tipAmount = (billAmount * percentageAmount) / 100;
  const totalAmount = (tipAmount * amountOfPeople).toFixed(2);
  displayResults(tipAmount, totalAmount);
  clearInputs();
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click', calculate);
});
customInput.addEventListener('input', calculate);
