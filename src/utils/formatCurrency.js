export function formatCurrency(
  amount,
  currency = "₹",
  locale = "en-IN"
) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${currency}0`;
  }

  return `${currency}${numericAmount.toLocaleString(locale, {
    maximumFractionDigits: 2,
  })}`;
}

export function formatCompactCurrency(
  amount,
  currency = "₹",
  locale = "en-IN"
) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${currency}0`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(numericAmount)
    .replace("₹", currency);
}

export default formatCurrency;