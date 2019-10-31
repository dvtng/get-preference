import nanoid from "nanoid";

export const createOption = label => {
  return {
    id: nanoid(),
    label
  };
};
