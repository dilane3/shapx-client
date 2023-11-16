export const generateId = () => {
  return Math.floor(Math.random() * 10000000000);
};

export const sleep = async (ms: number = 1000) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );
