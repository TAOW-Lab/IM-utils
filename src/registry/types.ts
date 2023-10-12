export type DIDDocument = {
  id: string;
  [key: string]: string | Record<string, string>;
};
