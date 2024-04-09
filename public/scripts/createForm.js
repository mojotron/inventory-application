const abilityContainer = document.getElementById('ability-list');
const abilityCheckboxes = abilityContainer.querySelectorAll(
  "input[type='checkbox']",
);
const abilityCounterDisplay = document.getElementById('ability-counter');
const itemRaritySelect = documnt.getElementById();

let abilityCounter = 0;
let abilityCounterMax = 0;

abilityCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    if (e.target.checked) {
      abilityCounter += 1;
    } else {
      abilityCounter -= 1;
    }
    abilityCounterDisplay.textContent = abilityCounter;
    console.log(e.target.name, e.target.checked);
  });
});
