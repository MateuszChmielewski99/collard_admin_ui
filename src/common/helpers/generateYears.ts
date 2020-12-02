export const getYearOptions = (): number[] => {
  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let a = 1920; a < currentYear + 20; years.push(a++)) {}

  return years.reverse();
};
