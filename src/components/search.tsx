import { StateTheme } from '../state';
import styles from './search.module.css';

export interface SearchProps {
  keyword: string;
  setKeyword: (s: string) => void;
  theme: StateTheme;
};

function Search({ keyword, setKeyword, theme }: SearchProps) {
  return (
    <div className={styles.search}>
      <input
        className={styles.bar}
        value={keyword}
        type="search"
        placeholder="type here to search..."
        onChange={(e) => { setKeyword(e.target.value) }}
        style={{
          color: theme.search.textColor,
          fontSize: theme.search.textSize,
        }}
      />
    </div>
  )
};

export default Search;