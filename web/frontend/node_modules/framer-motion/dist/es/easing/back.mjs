import { mirrorEasing } from './modifiers/mirror.mjs';
import { reverseEasing } from './modifiers/reverse.mjs';

const createBackIn = (power = 1.525) => (p) => p * p * ((power + 1) * p - power);
const backIn = createBackIn();
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);

export { backIn, backInOut, backOut, createBackIn };
