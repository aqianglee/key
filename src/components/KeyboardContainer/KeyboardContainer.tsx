import React from 'react';
import styles from './KeyboardContainer.module.less';

interface KeyboardContainerProps {
  children: React.ReactNode;
}

const KeyboardContainer: React.FC<KeyboardContainerProps> = ({ children }) => {
  return (
    <div className={styles['keyboard-container']}>
      {children}
    </div>
  );
};

export default KeyboardContainer;
