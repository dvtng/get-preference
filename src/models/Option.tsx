import nanoid from "nanoid";
import { Option } from "../api/PollType";

export type CreateOptionProps = {
  creatorId: string;
  label: string;
};

export const createOption = ({
  creatorId,
  label
}: CreateOptionProps): Option => {
  return {
    id: nanoid(),
    creatorId,
    createdAt: Date.now(),
    label
  };
};
