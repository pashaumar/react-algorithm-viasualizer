export const getRandomArray = (size) => {
  return Array(size)
    .fill(1)
    .map((item) => Math.ceil(Math.random() * 30 + item) - 1);
};

export const getExecutionLogs = (algorithm, message) => {
  return {
    algorithm: algorithm,
    time: ` ${
      new Date().getHours() > 12
        ? `${new Date().getHours() - 12}`
        : new Date().getHours()
    }:${new Date().getMinutes()}:${
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    } `,
    message: message,
  };
};
