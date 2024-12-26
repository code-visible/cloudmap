import styles from './pannel.module.css';

export interface PannelProps {
  count: number;
  setCount: (c: number) => void;
};

function Pannel({ count }: PannelProps) {
  return (
    <div className={styles.pannel}>pkgs/files, {count}</div>
  );
};

export default Pannel;
