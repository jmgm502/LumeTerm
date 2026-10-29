export function isExpirationDateUrgent(expirationDate: string, days = 5): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expirationDate)) return false;

  const expiration = new Date(`${expirationDate}T00:00:00Z`);
  if (Number.isNaN(expiration.getTime()) || expiration.toISOString().slice(0, 10) !== expirationDate) {
    return false;
  }

  const today = new Date();
  const expirationDay = expiration.getTime();
  const todayDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return (expirationDay - todayDay) / 86_400_000 <= days;
}
