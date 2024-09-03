'use strict';
import { currencySign } from './currencyConversion.js';
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
const currencyOptions = document.querySelector('#currency-selector');
let percentageAmount = 5;
function saveToLocalStorage(tipAmount, totalAmount) {
  localStorage.setItem('tipAmount', tipAmount);
  localStorage.setItem('totalAmount', totalAmount);
}
function clearInputs() {
  billInput.value = '';
  amountOfPeopleInput.value = '';
}
function displayResults(tipAmount, totalAmount, currencySign) {
  tipAmountResultContainer.textContent = `${currencySign} ${String(tipAmount)}`;
  totalAmountContainer.textContent = `${currencySign} ${String(totalAmount)}`;
  billInput.placeholder = customInput.placeholder = currencySign;
}
function resetData() {
  clearInputs();
  displayResults('', '', '$');
  currencyOptions.value = 'USD';
  localStorage.clear();
}
function calculate() {
  // e.preventDefault();
  if (billInput.value !== '' && amountOfPeopleInput.value !== '') {
    const [billAmount, amountOfPeople] = [
      Number(billInput.value),
      Number(amountOfPeopleInput.value),
    ];
    /*Setting percentage amount -  if user clicked on percentage button,  setting percentage amount as 
     data set property of this button otherwise number which was entered by user in custom form
    */
    
    const tipAmount = (billAmount * percentageAmount) / 100;
    const totalAmount = (tipAmount * amountOfPeople).toFixed(2);
    saveToLocalStorage(tipAmount, totalAmount);
    displayResults(tipAmount, totalAmount, currencySign);
  };
};
function setPercentage(e){
  e.preventDefault();
  percentageAmount = Number(this.dataset.percentage);
  console.log(this.dataset)
  calculate();
};
tipPercentageButtons.forEach((button)=>{
  button.addEventListener('click',setPercentage)
})
billInput.addEventListener('input', calculate);
amountOfPeopleInput.addEventListener('input', calculate);
resetButton.addEventListener('click', resetData);
customInput.addEventListener('input', calculate);
displayResults(initialTipAmount, initialTotalAmount, currencySign);
export {
  displayResults,
  initialTipAmount,
  initialTotalAmount,
  billInput,
  customInput,
  saveToLocalStorage,
};
