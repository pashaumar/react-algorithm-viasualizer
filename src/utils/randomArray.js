const createArray = (size) => {
  return Array(size)
    .fill(1)
    .map((item, index) => Math.ceil(Math.random() * 30 + item));
};
export default createArray;
