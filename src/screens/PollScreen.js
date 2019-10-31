import React, { useContext } from "react";
import { usePoll } from "../features/usePoll";
import { PollVoting } from "../features/PollVoting";
import { Loading } from "../widgets/Loading";
import { CurrentUserContext } from "../models/CurrentUser";
import { PollWaiting } from "../features/PollWaiting";
import { PollResults } from "../features/PollResults";

export const PollScreen = ({ pollId }) => {
  const poll = usePoll(pollId);
  const currentUser = useContext(CurrentUserContext);

  if (!poll) {
    return <Loading />;
  }

  const hasVoted = poll.votes && poll.votes[currentUser.id];

  return (
    <div>
      {poll.status === "OPEN" ? (
        hasVoted ? (
          <PollWaiting poll={poll} />
        ) : (
          <PollVoting poll={poll} />
        )
      ) : (
        <PollResults poll={poll} />
      )}
    </div>
  );
};
