const getRandomNumber = (maxCount: number): number => {
  const rand: number = Math.random() * (maxCount);
  return Math.floor(rand);
};

export default getRandomNumber;
