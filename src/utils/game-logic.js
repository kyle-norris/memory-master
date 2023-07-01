export function generateGrid(size) {
  // The size param is the width/height of the grid
  // For instance, a 4x4 grid should be size=4
  var all_values = Array((size * size) / 2)
    .fill()
    .map((x, i) => i);

  all_values.push(...all_values);
  var shuffled = shuffleArray(all_values);

  return shuffled.map((i) => i);
}

// This is the Fisher-Yates algorithm for shuffling
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
