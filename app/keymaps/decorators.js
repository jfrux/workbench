const mapKeys = require('../utils/map-keys');
import {getKeymaps} from '../settings';

function decorateObject(base, key) {
  let decorated = base;

  return decorated;
}

export function getDecoratedKeymaps() {
  const baseKeymaps = getKeymaps();
  console.log(baseKeymaps);
  if (baseKeymaps) {
    // Ensure that all keys are in an array and don't use deprecated key combination`
    const decoratedKeymaps = mapKeys(decorateObject(baseKeymaps, 'decorateKeymaps'));
    console.warn("decoratedKeymaps",decoratedKeymaps);
    return decoratedKeymaps;
  }
};