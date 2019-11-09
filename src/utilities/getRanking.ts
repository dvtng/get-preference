export const getRanking = (votes: string[][]) => {
  const counts: { [id: string]: number } = {};
  votes.forEach(orderedPrefs => {
    orderedPrefs.forEach((option, index) => {
      counts[option] = (counts[option] || 0) + (orderedPrefs.length - index);
    });
  });

  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};
