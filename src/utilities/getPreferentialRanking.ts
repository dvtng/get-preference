const removeOptions = (votes: string[][], ids: string[]): string[][] => {
  const idSet = new Set(ids);
  return votes.map(ordered => ordered.filter(x => !idSet.has(x)));
};

type Counts = {
  [id: string]: number;
};

const mergeMax = (a: Counts, b: Counts): Counts => {
  const result: Counts = { ...a };
  Object.entries(b).forEach(([id, count]) => {
    if (result[id]) {
      result[id] = Math.max(result[id], count);
    } else {
      result[id] = count;
    }
  });
  return result;
};

export const getPreferentialRanking = (
  votes: string[][]
): { ranking: string[]; counts: Counts } => {
  if (!votes.length || !votes[0].length) {
    return { ranking: [], counts: {} };
  }

  const counts: { [id: string]: number } = {};
  // Ensure each option is initialized
  votes[0].forEach(id => {
    counts[id] = 0;
  });
  // Count each option
  votes.forEach(orderedIds => {
    if (orderedIds.length) {
      counts[orderedIds[0]] = (counts[orderedIds[0]] || 0) + 1;
    }
  });

  const sortedEntries = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  const minIds: string[] = [sortedEntries[0][0]];
  const minCount = sortedEntries[0][1];
  for (let i = 1; i < sortedEntries.length; i++) {
    if (minCount !== sortedEntries[i][1]) {
      break;
    }
    minIds.push(sortedEntries[i][0]);
  }

  if (sortedEntries[sortedEntries.length - 1][1] > votes.length / 2) {
    // Majority reached
    return {
      ranking: sortedEntries.reverse().map(([id]) => id),
      counts
    };
  }

  const results = getPreferentialRanking(removeOptions(votes, minIds));

  return {
    ranking: results.ranking.concat(minIds),
    counts: mergeMax(counts, results.counts)
  };
};
