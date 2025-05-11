export const toDollars = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};
