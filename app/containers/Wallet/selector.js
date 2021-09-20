import BigNumber from 'bignumber.js';

export const getETHFee = (percentageFee, value) => {
  const bigValue = new BigNumber(value);
  const bigPercentageFee = new BigNumber(percentageFee);
  return bigValue.multipliedBy(bigPercentageFee).dividedBy(new BigNumber(100));
};
