import golang from "./go";
import javascript from "./js";
import python from "./py";
import rust from "./rs";

export interface LanguageOptions {
  name: string;
  model: string;
};

export const getLanguageOptions = (language: string): LanguageOptions => {
  switch (language) {
    case "javascript":
      return javascript;
    case "golang":
      return golang;
    case "python":
      return python;
    case "rust":
      return rust;
  }
  return javascript;
};