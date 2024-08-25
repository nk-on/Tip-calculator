const billInput = document.querySelector('#bill-input');
const tipPercentageButtons = document.querySelectorAll('.tip-percentage');
const customInput = document.querySelector('#custom-input');
const amountOfPeoplInput = document.querySelector('#number-of-people-input');
const timAmountResultContainer = document.querySelector('.tip-amount-result');
const totalAmountContainer = document.querySelector('.total-amount-result');
//Application should alert user with error if they don;t enter anything or dont enter number
//application should calculate tip amount and total amount when they click on tip percatage button
function calculate(e) {
  e.preventDefault();
  const [billAmount, amountOfPeople] = [
    Number(billInput.value),
    Number(amountOfPeoplInput.value),
  ];
  const percentageAmount = isNaN(this.dataset.percentage)
    ? this.value
    : this.dataset.percentage;
  const tipAmount = (billAmount * percentageAmount) / 100;
  const totalAmount = (tipAmount * amountOfPeople).toFixed(2);
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click', calculate);
});
customInput.addEventListener('input', calculate);
