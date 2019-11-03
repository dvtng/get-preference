import nanoid from "nanoid";

export const createOption = ({ creatorId, label }) => {
  return {
    id: nanoid(),
    creatorId,
    createdAt: Date.now(),
    label
  };
};
