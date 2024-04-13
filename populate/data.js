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
  'strength',
  'agility',
  'intellect',
  'stamina',
  'charisma',
  'constitution',
  'wisdom',
  'speed',
  'stealth',
  'critical chance',
  'critical damage',
  'intimidation',
  'deception',
  'perception',
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
