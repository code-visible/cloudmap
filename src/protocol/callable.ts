export interface SourceCallable {
  id: string;
  pos: string;
  name: string;
  abstract: string;
  file: string;
  pkg: string;
  comment: string;
  parameters: string[];
  results: string[];
  method: boolean;
  private: boolean;
  orphan: boolean;
};
