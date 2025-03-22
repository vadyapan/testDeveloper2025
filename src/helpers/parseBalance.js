export function parseBalance(balance) {
  return parseFloat(balance.replace(/[$,]/g, ''));
}
