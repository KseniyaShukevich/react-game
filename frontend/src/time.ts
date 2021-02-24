const getMinutes = (count: number): number => {
  const res: number = Math.floor(count / 60);
  return res;
};

const getSeconds = (count: number): string => {
  const res = count % 60;
  if (res < 10) {
    return `0${res}`;
  }
  return `${res}`;
};

export default getMinutes;
export { getSeconds };
