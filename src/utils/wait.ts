export const wait = (min: number = 100, max: number = 1000): Promise<void> => {
  const waitTime = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, waitTime));
};
