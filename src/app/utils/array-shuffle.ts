export function arrayShuffle(array: any[]) {
  const a = [...array];
  const n = a.length - 1;
  for (let i = n; i > 0; i--) {
    const j = Math.floor(Math.random() * n) + i;
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}
