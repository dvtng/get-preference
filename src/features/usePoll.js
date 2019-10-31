import { useEffect, useState } from "react";
import { subscribePoll } from "../api/PollApi";

export const usePoll = pollId => {
  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    return subscribePoll(pollId, data => {
      setPollData(data);
    });
  }, [pollId]);

  return pollData;
};
