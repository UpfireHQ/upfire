import crypto from 'crypto';
import { bufferToHex, toBuffer as ethToBuffer } from 'ethereumjs-util';

export const toBuffer = hex => {
  return ethToBuffer(hex);
};

export const random = bytes => {
  return crypto.randomBytes(bytes);
};

export const randomString = bytes => {
  return bufferToHex(random(bytes));
};
