import React from 'react';
import styles from './Test.module.less';

const Test: React.FC = () => {
  return (
    <div className={styles.test}>
      <h1>KeyV2 Component Test</h1>
      <p>This page is testing the KeyV2 component with different configurations.</p>
      
      <div className={styles.keysContainer}>
        <h2>Basic Keys</h2>
        <div className={styles.keysRow}>
         
        </div>
      </div>
    </div>
  );
};

export default Test;