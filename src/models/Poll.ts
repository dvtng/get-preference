import { useEffect, useState } from "react";
import { subscribePoll } from "../api/PollApi";
import { PollType } from "../api/PollType";

export const usePoll = (pollId: string): PollType | null => {
  const [pollData, setPollData] = useState<PollType | null>(null);

  useEffect(() => {
    return subscribePoll(pollId, data => {
      setPollData(data);
    });
  }, [pollId]);

  return pollData;
};
