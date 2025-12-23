import React from 'react';
import styles from './SelectedInfoPanel.module.less';
import Section from '../Section';
import KeyModel from '../../models/KeyModel';
import KnobModel from '../../models/KnobModel';
import ImageAreaModel from '../../models/ImageAreaModel';

interface SelectedInfoPanelProps {
  selectedKeys: KeyModel[];
  selectedKnobs: KnobModel[];
  selectedImageAreas: ImageAreaModel[];
  onClearAllSelections: () => void;
  title?: string;
}

const SelectedInfoPanel: React.FC<SelectedInfoPanelProps> = ({
  selectedKeys,
  selectedKnobs,
  selectedImageAreas,
  onClearAllSelections,
  title = '选中信息'
}) => {
  const totalSelected = selectedKeys.length + selectedKnobs.length + selectedImageAreas.length;

  return (
    <Section title={title}>
      <div className={styles['selection-info']}>
        <div className={styles['selected-count']}>
          已选中: {totalSelected} 个
        </div>
        {totalSelected > 0 && (
          <div className={styles['action-buttons']}>
            <button 
              className={styles['clear-btn']} 
              onClick={onClearAllSelections}
            >
              取消全选
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default SelectedInfoPanel;