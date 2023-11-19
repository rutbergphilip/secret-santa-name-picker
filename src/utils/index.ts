export const generateID = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
};
