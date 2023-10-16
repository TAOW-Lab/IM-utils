import axios from 'axios';

import { contexts } from './../constants';
import { DocumentContext } from './../common';
import { Resolver } from '..';

export const customDocumentLoader = async (
  url: string,
  resolver: Resolver = {
    resolveContext,
    resolveDID,
  }
): Promise<{
  documentUrl: string;
  document: DocumentContext;
}> => {
  const { resolveDID, resolveContext } = resolver;
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
