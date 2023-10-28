export type Extraction = {
  state: "success" | "failure" | "unsupported";
  content?: string;
};
