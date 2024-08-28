import {
  billInput,
  customInput,
  displayResults,
  initialTipAmount,
  initialTotalAmount,
} from './script.js';
const host = 'api.frankfurter.app';
const currencyOptions = document.querySelector('#currency-selector');
let currentCurrency = 'USD';
//App should be able to convert exsisting tip Amount and total amount to different currency
//if there is no default currency app should be just able to add differenct currency signs
function changeSign(currency) {
  const currencySymbols = new Map([
    ['USD', '$'], // United States Dollar
    ['EUR', '€'], // Euro
    ['GBP', '£'], // British Pound Sterling
    ['CHF', 'Fr.'], // Swiss Franc
  ]);
  const currencySign = currencySymbols.get(currency);
  localStorage.setItem('currencySign', currencySign);
  displayResults(initialTipAmount, initialTotalAmount, currencySign);
  billInput.placeholder = customInput.placeholder = currencySign;
}
async function getCurrencyRates(totalAmount, tipAmount, targetCurrency) {
  console.log(totalAmount, tipAmount);
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
  displayResults(convertedTipAmount,convertedTotalAmount,currentCurrency);
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
