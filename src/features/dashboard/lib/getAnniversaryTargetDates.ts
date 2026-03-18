type AnniversaryTargetDate = {
  yearsAgo: 5 | 10 | 15 | 20;
  date: string;
};

export function getAnniversaryTargetDates(): AnniversaryTargetDate[] {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentYear = today.getFullYear();

  const years = [5, 10, 15, 20] as const;

  return years.map((yearsAgo) => ({
    yearsAgo,
    date: `${currentYear - yearsAgo}-${month}-${day}`,
  }));
}
