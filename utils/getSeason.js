const getSeason = () => {
  const date = new Date();
  const month = date.getMonth();
  const fullYear = date.getFullYear();
  if (month >= 0 && month < 6) {
    return fullYear - 1;
  }
  return fullYear;
};
module.exports = getSeason;
