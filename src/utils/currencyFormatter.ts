const currencyFormatterVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

// 2. Formatter mới cho Đô la Mỹ
const currencyFormatterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export { currencyFormatterVND, currencyFormatterUSD };
