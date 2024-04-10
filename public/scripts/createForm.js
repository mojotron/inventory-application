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
    if (abilityCounter >= abilityCounterMax) {
      e.target.checked = false;
      return;
    }

    if (e.target.checked) {
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

//select item rarity option
const temp = itemRarity.options;
for (let i = 0; i < temp.length; i++) {
  if (temp[i].value === 'poor') temp[i].selected = true;
}
