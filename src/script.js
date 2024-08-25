const billInput = document.querySelector('#bill-input');
const tipPercentageButtons = document.querySelectorAll('.tip-percentage');
const customInput = document.querySelector('#custom-input');
const amountOfPeopleInput = document.querySelector('#number-of-people-input');
const tipAmountResultContainer = document.querySelector('.tip-amount-result');
const totalAmountContainer = document.querySelector('.total-amount-result');
/*Setting initial tip amount and total amount which will be data from local storage 
otherwise empty string*/
const initialTipAmount = localStorage.getItem('tipAmount') || '';
const initialTotalAmount = localStorage.getItem('totalAmount') || '';
function saveToLocalStorage(tipAmount, totalAmount){
  localStorage.setItem('tipAmount',tipAmount);
  localStorage.setItem('totalAmount',totalAmount);
}
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
  /*Setting percentage amount -  if user clicked on percentage button,  setting percentage amount as 
   data set property of this button otherwise number which was entered by user in custom form
  */
  const percentageAmount = isNaN(this.dataset.percentage)
    ? this.value
    : this.dataset.percentage;
  const tipAmount = (billAmount * percentageAmount) / 100;
  const totalAmount = (tipAmount * amountOfPeople).toFixed(2);
  saveToLocalStorage(tipAmount, totalAmount);
  displayResults(tipAmount, totalAmount);
  clearInputs();
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click', calculate);
});
customInput.addEventListener('input', calculate);
displayResults(initialTipAmount,initialTotalAmount);
