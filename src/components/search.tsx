import styles from './search.module.css';

export interface SearchProps {
  keyword: string;
  setKeyword: (s: string) => void;
};

function Search({ keyword, setKeyword }: SearchProps) {
  return (
    <div className={styles.search}>
      <input
        className={styles.bar}
        value={keyword}
        type="search"
        placeholder="type here to search..."
        onChange={(e) => { setKeyword(e.target.value) }}
      />
    </div>
  )
};

export default Search;