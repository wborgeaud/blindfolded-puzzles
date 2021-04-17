const K = 20;

const updateElo = (elo, puzzleElo, result) => {
  const expectedResult = 1 / (1 + (10 ** ((puzzleElo - elo) / 400)));
  const newElo = Math.round(elo + K * (result - expectedResult));
  window.localStorage.setItem('elo', JSON.stringify({ elo: newElo }));
  return newElo;
}

export default updateElo;