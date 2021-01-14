const createArray = (size) => {
  return Array(size)
    .fill(1)
    .map((item) => Math.ceil(Math.random() * 30 + item) - 1);
};
export default createArray;
