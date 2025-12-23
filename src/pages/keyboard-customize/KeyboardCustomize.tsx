import React from 'react';
import KeyboardCustomizePanel from '../../components/KeyboardCustomizePanel';
import KeyboardArea from '../../components/KeyboardArea/KeyboardArea';
import KeyboardContainer from '../../components/KeyboardContainer';

const KeyboardCustomize: React.FC = () => {
  return (
    <KeyboardContainer>
      {/* 控制面板 */}
      <KeyboardCustomizePanel />
      
      {/* 键盘区域 */}
      <KeyboardArea />
    </KeyboardContainer>
  );
};

export default KeyboardCustomize;