import axios from 'axios';

import { contexts } from './../constants';

type DocumentContext = {
  [key: string]: string | Record<string, string>;
};
export const customDocumentLoader = async (
  url: string
): Promise<{
  documentUrl: string;
  document: DocumentContext;
}> => {
  // const { document } = await documentLoader(url);
  let document: DocumentContext = {};
  const existed = Object.keys(contexts).includes(url);
  if (existed) {
    document = contexts[url];
  }
  if (url.startsWith('http')) {
    document = await resolveContext(url);
  }
  if (url.startsWith('did')) {
    document = resolveDID(url);
  }
  return { document, documentUrl: url };
};

export const resolveDID = (did: string): DocumentContext => {
  return {
    did: did,
  };
};

export const resolveContext = async (url: string): Promise<DocumentContext> => {
  const { data } = await axios.get<DocumentContext>(url);
  return data;
};
