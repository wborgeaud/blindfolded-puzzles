export function squareStyle(game) {
  const style = {};
  for (const column of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
    for (const row of ['1', '2', '3', '4', '5', '6', '7', '8']) {
      let square = column + row;
      let p = game.get(square);
      if (p) {
        style[square] = p.color === 'w' ? { backgroundColor: "lightblue" } : { backgroundColor: "salmon" };
      }
    }
  }
  return style;
}