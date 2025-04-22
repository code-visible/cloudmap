export interface SourceCallable {
  id: string;
  pos: string;
  name: string;
  signature: string;
  abstract: string;
  file: string;
  comment: string;
  parameters: string[];
  results: string[];
  method: boolean;
  private: boolean;
};
