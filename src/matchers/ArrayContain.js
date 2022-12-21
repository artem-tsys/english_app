import {isEqual} from 'lodash';

const ArrayContainingEl = (arr, element) => arr.some((el) => isEqual(el, element));
const ArrayContainingArr = (arr, list) => list.every((el) => ArrayContainingEl(arr, el));

export default function ArrayContain(received, list) {
  const Fn = Array.isArray(received) ? ArrayContainingArr : ArrayContainingEl;
  const pass = Fn(list, received);

  const message = pass
    ? () => `expected ${JSON.stringify(received)} not to be in the list ${JSON.stringify(list)}`
    : () => `expected ${JSON.stringify(received)} to be in the list ${JSON.stringify(list)}`

  return {
    message,
    pass,
  }
}
