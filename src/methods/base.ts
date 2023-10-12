export interface Base {
  createVc(): Promise<void>;
  verifyVc(): Promise<void>;
}
