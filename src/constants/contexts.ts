import credentials_v1 from './../contexts/credentials_v1';
export const contexts = {
  'https://www.w3.org/2018/credentials/v1': credentials_v1,
} as {
  [key: string]: any;
};
