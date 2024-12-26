import styles from './graph.module.css';

export interface GraphProps { };

function Graph({ }: GraphProps) {
  return (
    <div className={styles.graph}>graph</div>
  );
};

export default Graph;
