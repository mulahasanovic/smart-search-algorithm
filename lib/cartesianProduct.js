module.exports = function cartesianProduct(arrays) {
  return arrays.reduce(
    (a, b) => {
      return a.flatMap((d) => b.map((e) => [d, e].flat()));
    },
    [[]]
  );
};
