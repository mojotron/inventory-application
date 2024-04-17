const CATEGORIES = [
  {
    name: 'weapon',
    maxPower: 20,
    categories: [
      'club',
      'dagger',
      'axe',
      'hammer',
      'mace',
      'quarterstaff',
      'spear',
      'sling',
      'bow',
      'crossbow',
      'flail',
      'sword',
    ],
  },
  {
    name: 'armor',
    maxPower: 25,
    categories: [
      'head',
      'shoulders',
      'chest',
      'wrist',
      'hands',
      'waist',
      'legs',
      'feet',
      'back',
    ],
  },
  {
    name: 'consumable',
    maxPower: 5,
    categories: [
      'food',
      'drink',
      'elixir',
      'flask',
      'bandage',
      'scroll',
      'rune',
    ],
  },
];

const ABILITIES = [
  { name: 'strength', modifier: 1.25 },
  { name: 'agility', modifier: 1.25 },
  { name: 'intellect', modifier: 1.25 },
  { name: 'stamina', modifier: 1.25 },
  { name: 'charisma', modifier: 0.75 },
  { name: 'constitution', modifier: 1 },
  { name: 'wisdom', modifier: 0.75 },
  { name: 'speed', modifier: 1.5 },
  { name: 'stealth', modifier: 0.25 },
  { name: 'critical chance', modifier: 0.5 },
  { name: 'critical damage', modifier: 0.5 },
  { name: 'intimidation', modifier: 0.75 },
  { name: 'deception', modifier: 0.75 },
  { name: 'perception', modifier: 0.75 },
];

const ITEM_RARITY = [
  {
    name: 'poor',
    powerModifier: 0.5,
    priceModifier: 0.5,
    bonusAbilities: 0,
    abilityModifier: 0,
  },
  {
    name: 'common',
    powerModifier: 0.75,
    priceModifier: 0.75,
    bonusAbilities: 1,
    abilityModifier: 0.25,
  },
  {
    name: 'uncommon',
    powerModifier: 1,
    priceModifier: 1,
    bonusAbilities: 2,
    abilityModifier: 0.5,
  },
  {
    name: 'rare',
    powerModifier: 1.5,
    priceModifier: 1.5,
    bonusAbilities: 3,
    abilityModifier: 1,
  },
  {
    name: 'epic',
    powerModifier: 2,
    priceModifier: 2,
    bonusAbilities: 4,
    abilityModifier: 1.5,
  },
  {
    name: 'legendary',
    powerModifier: 4,
    priceModifier: 4,
    bonusAbilities: 6,
    abilityModifier: 3,
  },
];

module.exports = { CATEGORIES, ABILITIES, ITEM_RARITY };
