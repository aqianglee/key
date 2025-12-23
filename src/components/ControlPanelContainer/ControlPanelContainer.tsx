import React, { ReactNode } from 'react';
import styles from './ControlPanelContainer.module.less';

interface ControlPanelContainerProps {
  children: ReactNode;
}

const ControlPanelContainer: React.FC<ControlPanelContainerProps> = ({ children }) => {
  return (
    <div className={styles['control-panel']}>
      {children}
    </div>
  );
};

export default ControlPanelContainer;