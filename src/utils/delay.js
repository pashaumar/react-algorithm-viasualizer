export const delay = (delaySpeed) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delaySpeed);
  });
};
