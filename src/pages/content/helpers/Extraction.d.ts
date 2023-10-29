export type Extraction = {
  state: "success" | "failure" | "unsupported";
  article?: {
    title: string
    content: string;
  }
};
