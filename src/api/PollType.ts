export type Status = "OPTIONS" | "OPEN" | "CLOSED";

export type User = {
  name: string;
};

export type Option = {
  id: string;
  creatorId: string;
  createdAt: number;
  label: string;
};

export type PollType = {
  id: string;
  creatorId: string;
  status: Status;
  name?: string;
  users: {
    [userId: string]: User;
  };
  options: {
    [optionId: string]: Option;
  };
  submittedOptions?: {
    [userId: string]: boolean;
  };
  votes?: {
    [userId: string]: string[];
  };
};
