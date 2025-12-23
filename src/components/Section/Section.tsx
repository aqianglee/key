import React, { ReactNode } from 'react';
import styles from './Section.module.less';

interface SectionProps {
  children: ReactNode;
  title?: string;
}

const Section: React.FC<SectionProps> = ({ children, title }) => {
  return (
    <div className={styles['section']}>
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
};

export default Section;