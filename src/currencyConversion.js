import {
  billInput,
  customInput,
  displayResults,
  initialTipAmount,
  initialTotalAmount,
} from './script.js';
const host = 'api.frankfurter.app';
const currencyOptions = document.querySelector('#currency-selector');
let currentCurrency = localStorage.getItem('currency') || 'USD';
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
async function getCurrencyRates(amount, currencyFrom, targetCurrency) {
  const { initialTipAmount, initialTotalAmount } = amount;
  let totalAmountResponse;
  let tipAmountResponse;
  const tipAmountData = fetch(
    `https://${host}/latest?amount=${initialTipAmount}&from=${currentCurrency}&to${targetCurrency}`
  ).then((res)=> res.json());
  const totalAmountData = fetch(
    `https://${host}/latest?amount=${initialTotalAmount}&from=${currentCurrency}&to${targetCurrency}`
  ).then((res)=>res.json());
  [totalAmountResponse,tipAmountResponse] = await Promise.all([tipAmountData,totalAmountData]);
  console.log(totalAmountResponse,tipAmountResponse)
}
currencyOptions.addEventListener('change', (e) => {
  changeSign(e.target.value);
  getCurrencyRates(
    { initialTipAmount, initialTotalAmount },
    currentCurrency,
    e.target.value
  );
  localStorage.setItem('currency', e.target.value);
});
