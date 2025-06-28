// const BASE_URL =
//   "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/"
//   ////  currencies/eur.json";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const choose = document.querySelectorAll(".choose select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

//to create a <option> elemnets for all country in dropdown ie <select>
for (let select of choose) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "AUD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  //to trigger a event when a select is changed
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

//event listener for btn
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("input");
  let selectedItem = fromCurr.value.toLowerCase();
  let selectedItemToConvert = toCurr.value.toLowerCase();
  //   console.log(selectedItemToConvert)
  const URL = `${BASE_URL}/${selectedItem}.json`;
  // const URL= `${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json"`
  let response = await fetch(URL);
  const data = response.json();
  data.then((res) => {
    let exchangeRate = Object.entries(res)[1][1];
    for (key in exchangeRate) {
      if (key == selectedItemToConvert) {
        const rate = exchangeRate[key];
        let finalOutput = rate * amount.value;
        let initInput = document.querySelector(".result input");
        initInput.value = finalOutput;
          let initP = document.querySelector(".result p");
        //   console.log(initP)
          initP.innerText=selectedItemToConvert.toUpperCase()
      }
    }
  });
});
