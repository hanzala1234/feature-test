const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

const mapAsync = (list, asyncFunc) => Promise.all(list.map(asyncFunc));

const mapAsyncInSlices = async (list, sliceSize, asyncFunc) => {
  // eslint-disable-next-line no-param-reassign
  if (!sliceSize) sliceSize = list.length;
  const result = [];
  let sliceStart = 0;

  while (sliceStart < list.length) {
    result.push(
      // eslint-disable-next-line no-await-in-loop
      ...(await Promise.all(
        list.slice(sliceStart, sliceStart + sliceSize).map(asyncFunc),
      )),
    );
    sliceStart += sliceSize;
  }

  return result;
};

module.exports = {
  timeout,
  mapAsync,
  mapAsyncInSlices,
};
