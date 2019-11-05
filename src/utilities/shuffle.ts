const swap = (array: any[], a: number, b: number) => {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

export const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
  return array;
};
