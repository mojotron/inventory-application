/* eslint-disable no-undef */

const abilityContainer = document.getElementById('ability-list');
const abilityCheckboxes = abilityContainer.querySelectorAll(
  "input[type='checkbox']",
);
const itemRarity = document.getElementById('item-rarity');

const abilityCounterDOM = document.getElementById('ability-counter');
const abilityCounterMaxDOM = document.getElementById('ability-counter-max');

let abilityCounter = 0;
let abilityCounterMax = 0;

abilityCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    if (e.currentTarget.checked === true) {
      if (abilityCounter >= abilityCounterMax) {
        e.currentTarget.checked = false;
        return;
      }
      abilityCounter += 1;
    } else {
      abilityCounter -= 1;
    }

    abilityCounterDOM.textContent = abilityCounter;
  });
});

itemRarity.addEventListener('change', function () {
  const abilityCounterValue = Number(
    this.selectedOptions[0].getAttribute('data-ability-count'),
  );

  abilityCounterMax = abilityCounterValue;
  abilityCounterMaxDOM.textContent = abilityCounterValue.toString();

  abilityCheckboxes.forEach((cb) => (cb.checked = false));
  abilityCounter = 0;
  abilityCounterDOM.textContent = abilityCounter.toString();
});

const init = () => {
  //select item rarity option
  const rarityOptions = itemRarity.options;
  for (let i = 0; i < rarityOptions.length; i++) {
    if (rarityOptions[i].value === 'poor') rarityOptions[i].selected = true;
  }
  // uncheck all checked abilities
  abilityCheckboxes.forEach((checkbox) => (checkbox.checked = false));
};

init();
