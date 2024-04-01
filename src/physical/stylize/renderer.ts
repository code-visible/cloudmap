import { Options } from "../fragments/options";

export abstract class Renderer {
  abstract mesh(path: string, opts?: Options): void
};