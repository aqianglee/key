import React, { ReactNode } from 'react';
import styles from './ControlCard.module.less';

interface ControlCardProps {
  children: ReactNode;
  title?: string;
}

const ControlCard: React.FC<ControlCardProps> = ({ children, title }) => {
  return (
    <div className={styles['control-card']}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default ControlCard;