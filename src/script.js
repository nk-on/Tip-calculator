'use strict'
import { currencySign } from "./currencyConversion.js";
const billInput = document.querySelector('#bill-input');
const tipPercentageButtons = document.querySelectorAll('.tip-percentage');
const customInput = document.querySelector('#custom-input');
const amountOfPeopleInput = document.querySelector('#number-of-people-input');
const tipAmountResultContainer = document.querySelector('.tip-amount-result');
const totalAmountContainer = document.querySelector('.total-amount-result');
const resetButton = document.querySelector('.Reset-button');
/*Setting initial tip amount and total amount which will be data from local storage 
otherwise empty string*/
const initialTipAmount = localStorage.getItem('tipAmount') || '';
const initialTotalAmount = localStorage.getItem('totalAmount') || '';
const currencyOptions = document.querySelector('#currency-selector')
function saveToLocalStorage(tipAmount, totalAmount){
  localStorage.setItem('tipAmount',tipAmount);
  localStorage.setItem('totalAmount',totalAmount);
}
function clearInputs() {
  billInput.value = '';
  amountOfPeopleInput.value = '';
}
function validateInput(billAmount, amountOfPeople) {
  console.log(billAmount,amountOfPeople)
  if (!billAmount.length || !amountOfPeople.length) {
    alert('Enter valid number');
    return true;
  }
}
function displayResults(tipAmount, totalAmount,currencySign) {
  tipAmountResultContainer.textContent = `${currencySign} ${String(tipAmount)}`;
  totalAmountContainer.textContent = `${currencySign} ${String(totalAmount)}`;
  billInput.placeholder = customInput.placeholder = currencySign;
}
function resetData(){
  clearInputs();
  displayResults('','','$');
  currencyOptions.value = 'USD';
  localStorage.clear();
}
function calculate(e) {
  e.preventDefault();
  if(validateInput(billInput.value, amountOfPeopleInput.value)) return;
  const [billAmount, amountOfPeople] = [
    Number(billInput.value),
    Number(amountOfPeopleInput.value),
  ];
  /*Setting percentage amount -  if user clicked on percentage button,  setting percentage amount as 
   data set property of this button otherwise number which was entered by user in custom form
  */
  const percentageAmount = isNaN(this.dataset.percentage)
    ? this.value
    : this.dataset.percentage;
  const tipAmount = (billAmount * percentageAmount) / 100;
  const totalAmount = (tipAmount * amountOfPeople).toFixed(2);
  saveToLocalStorage(tipAmount, totalAmount);
  displayResults(tipAmount, totalAmount,currencySign);
  clearInputs();
}
tipPercentageButtons.forEach((button) => {
  button.addEventListener('click', calculate);
});
resetButton.addEventListener('click',resetData)
customInput.addEventListener('input', calculate);
displayResults(initialTipAmount,initialTotalAmount,currencySign);
export{displayResults,initialTipAmount,initialTotalAmount,billInput,customInput,saveToLocalStorage}