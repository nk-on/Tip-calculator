import {
  billInput,
  customInput,
  displayResults,
  initialTipAmount,
  initialTotalAmount,
  saveToLocalStorage,
} from './script.js';
const host = 'api.frankfurter.app';
const currencyOptions = document.querySelector('#currency-selector');
let currentCurrency = localStorage.getItem('currencySign') || 'USD';
let currencySign = localStorage.getItem('currencySign') || '$';
/*Changing currency signs in the app when user  chooses different currency sign by 
  choosing currency sign from currencySymbols map and assigning to global currencySign variable
*/
function changeSign(currency) {
  const currencySymbols = new Map([
    ['USD', '$'], // United States Dollar
    ['EUR', '€'], // Euro
    ['GBP', '£'], // British Pound Sterling
    ['CHF', 'Fr.'], // Swiss Franc
  ]);
  currencySign = currencySymbols.get(currency);
  localStorage.setItem('currencySign', currencySign);
  displayResults(initialTipAmount, initialTotalAmount, currencySign);
  billInput.placeholder = customInput.placeholder = currencySign;
}
/* Converting exsisting total Amount and tip amount variables by fetching and resolving API for both total amount and tip amount variables
   and calling displayResults function which on itself is responsible for diplaying reuslts on app
*/
async function getCurrencyRates(totalAmount, tipAmount, targetCurrency) {
  if(!totalAmount || !tipAmount){
    return;
  }
  const tipAmountData = fetch(
    `https://${host}/latest?amount=${totalAmount}&from=${currentCurrency}&to${targetCurrency}`
  ).then((res) => res.json());
  const totalAmountData = fetch(
    `https://${host}/latest?amount=${tipAmount}&from=${currentCurrency}&to${targetCurrency}`
  ).then((res) => res.json());
  const [totalAmountResponse, tipAmountResponse] = await Promise.all([
    tipAmountData,
    totalAmountData,
  ]);
  const [convertedTotalAmount,convertedTipAmount] = [totalAmountResponse.rates[currentCurrency],tipAmountResponse.rates[currentCurrency]];
  displayResults(convertedTipAmount,convertedTotalAmount,currencySign);
  saveToLocalStorage(convertedTipAmount,convertedTotalAmount);
}
currencyOptions.addEventListener('change', (e) => {
  changeSign(e.target.value);
  const [totalAmount, tipAmount] = [
    localStorage.getItem('totalAmount'),
    localStorage.getItem('tipAmount'),
  ];
  getCurrencyRates(totalAmount, tipAmount, e.target.value);
  localStorage.setItem('currency', e.target.value);
  currentCurrency = localStorage.getItem('currency');
});
