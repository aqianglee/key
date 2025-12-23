import React, { useState } from 'react';
import styles from './KeyDesignPanel.module.less';
import KeyModel from '../../models/KeyModel';
import KnobModel from '../../models/KnobModel';
import ImageAreaModel from '../../models/ImageAreaModel';
import KeyboardModel from '../../models/KeyboardModel';
import ImportExportComponent from '../ImportExportComponent/ImportExportComponent';
import ControlCard from '../ControlCard';
import Section from '../Section';
import ControlPanelContainer from '../ControlPanelContainer';
import SelectedInfoPanel from '../SelectedInfoPanel';

interface KeyDesignPanelProps {
  selectedKeys: KeyModel[];
  selectedKnobs: KnobModel[];
  selectedImageAreas: ImageAreaModel[];
  onUpdateKeyDimensions: (keyId: string, width: number, height: number) => void;
  onBatchUpdateKeyDimensions: (width: number, height: number) => void;
  onUpdateKeyPosition: (keyId: string, x: number, y: number) => void;
  onBatchUpdateKeyPosition: (xOffset: number, yOffset: number) => void;
  onUpdateKeyLabel: (keyId: string, label: string) => void;
  onUpdateKeyId: (keyId: string, newId: string) => void;
  onAddKey: (key: Omit<KeyModel, 'id' | 'isSelected'>) => void;
  onBatchRemoveKeys: () => void;
  
  onUpdateKnobDimensions: (knobId: string, width: number, height: number) => void;
  onBatchUpdateKnobDimensions: (width: number, height: number) => void;
  onUpdateKnobPosition: (knobId: string, x: number, y: number) => void;
  onBatchUpdateKnobPosition: (xOffset: number, yOffset: number) => void;
  onAddKnob: (knob: Omit<KnobModel, 'id' | 'isSelected'>) => void;
  onBatchRemoveKnobs: () => void;
  
  onUpdateImageAreaDimensions: (imageAreaId: string, width: number, height: number) => void;
  onBatchUpdateImageAreaDimensions: (width: number, height: number) => void;
  onUpdateImageAreaPosition: (imageAreaId: string, x: number, y: number) => void;
  onBatchUpdateImageAreaPosition: (xOffset: number, yOffset: number) => void;
  onAddImageArea: (imageArea: Omit<ImageAreaModel, 'id' | 'isSelected'>) => void;
  onBatchRemoveImageAreas: () => void;
  
  onClearAllSelections: () => void;
  keyboardDimensions?: {
    width: number;
    height: number;
    margin: number;
    uValue: number;
    padding: number;
  };
  onUpdateKeyboardDimensions?: () => void;
  onKeyboardDimensionChange?: (field: 'width' | 'height' | 'margin' | 'uValue' | 'padding', value: string) => void;
  keyboardName: string;
  onKeyboardNameChange: (name: string) => void;
  onExportKeyboard: () => void;
  onImportKeyboard: (data: KeyboardModel) => void;
}

const KeyDesignPanel: React.FC<KeyDesignPanelProps> = ({
  selectedKeys,
  selectedKnobs,
  selectedImageAreas,
  onUpdateKeyDimensions,
  onBatchUpdateKeyDimensions,
  onUpdateKeyPosition,
  onBatchUpdateKeyPosition,
  onUpdateKeyLabel,
  onUpdateKeyId,
  onAddKey,
  onBatchRemoveKeys,
  
  onUpdateKnobDimensions,
  onBatchUpdateKnobDimensions,
  onUpdateKnobPosition,
  onBatchUpdateKnobPosition,
  onAddKnob,
  onBatchRemoveKnobs,
  
  onUpdateImageAreaDimensions,
  onBatchUpdateImageAreaDimensions,
  onUpdateImageAreaPosition,
  onBatchUpdateImageAreaPosition,
  onAddImageArea,
  onBatchRemoveImageAreas,
  
  onClearAllSelections,
  keyboardDimensions = { width: 23, height: 6, margin: 20, uValue: 52, padding: 1 },
  onUpdateKeyboardDimensions,
  onKeyboardDimensionChange,
  keyboardName,
  onKeyboardNameChange,
  onExportKeyboard,
  onImportKeyboard
}) => {
  // 本地状态用于编辑按键属性
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 1,
    x: 0,
    y: 0
  });
  
  // 本地状态用于编辑按键ID和Label
  const [keyInfo, setKeyInfo] = useState({
    id: '',
    label: ''
  });
  
  // 当选择的组件变化时，自动更新组件属性数据
  React.useEffect(() => {
    // 处理单个按键选择
    if (selectedKeys.length === 1) {
      const selectedKey = selectedKeys[0];
      setDimensions({
        width: selectedKey.width,
        height: selectedKey.height,
        x: selectedKey.x,
        y: selectedKey.y
      });
      setKeyInfo({
        id: selectedKey.id,
        label: selectedKey.label
      });
    }
    // 处理单个旋钮选择
    else if (selectedKnobs.length === 1) {
      const selectedKnob = selectedKnobs[0];
      setDimensions({
        width: selectedKnob.width,
        height: selectedKnob.height,
        x: selectedKnob.x,
        y: selectedKnob.y
      });
      setKeyInfo({
        id: selectedKnob.id,
        label: selectedKnob.label || ''
      });
    }
    // 处理单个图片区域选择
    else if (selectedImageAreas.length === 1) {
      const selectedImageArea = selectedImageAreas[0];
      setDimensions({
        width: selectedImageArea.width,
        height: selectedImageArea.height,
        x: selectedImageArea.x,
        y: selectedImageArea.y
      });
      setKeyInfo({
        id: selectedImageArea.id,
        label: selectedImageArea.label || ''
      });
    }
  }, [selectedKeys, selectedKnobs, selectedImageAreas]);
  
  // 本地状态用于新按键的id和label
  const [newKeyInfo, setNewKeyInfo] = useState({
    id: '',
    label: 'NEW'
  });
  
  // 移动步长状态
  const [moveStep, setMoveStep] = useState(0.5);
  
  // 更新尺寸输入
  const handleDimensionChange = (field: keyof typeof dimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    setDimensions(prev => ({
      ...prev,
      [field]: numValue
    }));
  };
  
  // 更新步长输入
  const handleStepChange = (value: string) => {
    const numValue = parseFloat(value) || 0.5;
    // 限制步长范围在0.1到1之间
    const clampedValue = Math.max(0.1, Math.min(1, numValue));
    setMoveStep(clampedValue);
  };
  
  // 应用尺寸更新到选中的组件
  const handleApplyDimensions = () => {
    // 处理单个按键尺寸更新
    if (selectedKeys.length === 1) {
      onUpdateKeyDimensions(selectedKeys[0].id, dimensions.width, dimensions.height);
    }
    // 处理单个旋钮尺寸更新
    else if (selectedKnobs.length === 1) {
      onUpdateKnobDimensions(selectedKnobs[0].id, dimensions.width, dimensions.height);
    }
    // 处理单个图片区域尺寸更新
    else if (selectedImageAreas.length === 1) {
      onUpdateImageAreaDimensions(selectedImageAreas[0].id, dimensions.width, dimensions.height);
    }
    // 批量更新选中按键的尺寸
    else if (selectedKeys.length > 0) {
      onBatchUpdateKeyDimensions(dimensions.width, dimensions.height);
    }
    // 批量更新选中旋钮的尺寸
    else if (selectedKnobs.length > 0) {
      onBatchUpdateKnobDimensions(dimensions.width, dimensions.height);
    }
    // 批量更新选中图片区域的尺寸
    else if (selectedImageAreas.length > 0) {
      onBatchUpdateImageAreaDimensions(dimensions.width, dimensions.height);
    }
  };
  
  // 应用位置更新到选中的组件
  const handleApplyPosition = () => {
    // 处理单个按键位置更新
    if (selectedKeys.length === 1) {
      onUpdateKeyPosition(selectedKeys[0].id, dimensions.x, dimensions.y);
    }
    // 处理单个旋钮位置更新
    else if (selectedKnobs.length === 1) {
      onUpdateKnobPosition(selectedKnobs[0].id, dimensions.x, dimensions.y);
    }
    // 处理单个图片区域位置更新
    else if (selectedImageAreas.length === 1) {
      onUpdateImageAreaPosition(selectedImageAreas[0].id, dimensions.x, dimensions.y);
    }
    // 批量移动选中按键
    else if (selectedKeys.length > 0) {
      onBatchUpdateKeyPosition(dimensions.x, dimensions.y);
    }
    // 批量移动选中旋钮
    else if (selectedKnobs.length > 0) {
      onBatchUpdateKnobPosition(dimensions.x, dimensions.y);
    }
    // 批量移动选中图片区域
    else if (selectedImageAreas.length > 0) {
      onBatchUpdateImageAreaPosition(dimensions.x, dimensions.y);
    }
  };
  
  // 应用ID和Label更新到选中的组件
  const handleApplyKeyInfo = () => {
    // 处理单个按键信息更新
    if (selectedKeys.length === 1) {
      onUpdateKeyId(selectedKeys[0].id, keyInfo.id);
      onUpdateKeyLabel(selectedKeys[0].id, keyInfo.label);
    }
  };
  
  // 更新键信息输入
  const handleKeyInfoChange = (field: keyof typeof keyInfo, value: string) => {
    setKeyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // 批量移动组件
  const handleBatchMove = (xOffset: number, yOffset: number) => {
    const finalXOffset = xOffset * moveStep;
    const finalYOffset = yOffset * moveStep;
    
    // 移动键
    onBatchUpdateKeyPosition(finalXOffset, finalYOffset);
    // 移动旋钮
    onBatchUpdateKnobPosition(finalXOffset, finalYOffset);
    // 移动图片区域
    onBatchUpdateImageAreaPosition(finalXOffset, finalYOffset);
  };
  
  // 更新新按键信息
  const handleNewKeyInfoChange = (field: 'id' | 'label', value: string) => {
    setNewKeyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // 添加新按键
  const handleAddKey = () => {
    console.log('Adding key with dimensions:', dimensions, 'and info:', newKeyInfo);
    onAddKey({
      label: newKeyInfo.label,
      width: dimensions.width,
      height: dimensions.height,
      x: dimensions.x,
      y: dimensions.y,
      color: 'default'
    });
  };
  
  return (
    <ControlPanelContainer>
      {/* 1. 键盘管理模块 */}
      <ControlCard title="键盘管理">
        
        <Section title="键盘名称">
          <ImportExportComponent
            keyboardName={keyboardName}
            onKeyboardNameChange={onKeyboardNameChange}
            onExport={onExportKeyboard}
            onImport={onImportKeyboard}
          />
        </Section>
        
        <Section title="键盘尺寸调整">
          
          <div className={styles['input-row']}>
            <div className={styles['input-group']}>
              <label>宽度 (u):</label>
              <input 
                type="number" 
                value={keyboardDimensions.width} 
                onChange={(e) => onKeyboardDimensionChange && onKeyboardDimensionChange('width', e.target.value)}
                step="0.5"
                min="5"
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>高度 (u):</label>
              <input 
                type="number" 
                value={keyboardDimensions.height} 
                onChange={(e) => onKeyboardDimensionChange && onKeyboardDimensionChange('height', e.target.value)}
                step="0.5"
                min="3"
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>外边距 (px):</label>
              <input 
                type="number" 
                value={keyboardDimensions.margin} 
                onChange={(e) => onKeyboardDimensionChange && onKeyboardDimensionChange('margin', e.target.value)}
                step="5"
                min="0"
                max="50"
              />
            </div>
          </div>
          
          <div className={styles['input-row']}>
            <div className={styles['input-group']}>
              <label>1u等于多少px:</label>
              <input 
                type="number" 
                value={keyboardDimensions.uValue} 
                onChange={(e) => onKeyboardDimensionChange && onKeyboardDimensionChange('uValue', e.target.value)}
                step="1"
                min="20"
                max="100"
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>键内部padding (px):</label>
              <input 
                type="number" 
                value={keyboardDimensions.padding} 
                onChange={(e) => onKeyboardDimensionChange && onKeyboardDimensionChange('padding', e.target.value)}
                step="0.5"
                min="0"
                max="5"
              />
            </div>
          </div>
          
          <div className={styles['button-group']}>
            <button 
              className={styles['apply-btn']} 
              onClick={onUpdateKeyboardDimensions}
            >
              应用尺寸
            </button>
          </div>
        </Section>
      </ControlCard>
      
      {/* 2. 键盘属性模块 */}
      <ControlCard title="键盘属性">
        
        <Section title="组件属性">
          
          <div className={styles['input-row']}>
            <div className={styles['input-group']}>
              <label>宽度 (u):</label>
              <input 
                type="number" 
                value={dimensions.width} 
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                step="0.5"
                min="0.5"
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>高度 (u):</label>
              <input 
                type="number" 
                value={dimensions.height} 
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                step="1"
                min="1"
              />
            </div>
          </div>
          
          <div className={styles['input-row']}>
            <div className={styles['input-group']}>
              <label>X 位置 (u):</label>
              <input 
                type="number" 
                value={dimensions.x} 
                onChange={(e) => handleDimensionChange('x', e.target.value)}
                step="0.5"
                min="0"
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>Y 位置 (u):</label>
              <input 
                type="number" 
                value={dimensions.y} 
                onChange={(e) => handleDimensionChange('y', e.target.value)}
                step="1"
                min="0"
              />
            </div>
          </div>
          
          <div className={styles['input-row']}>
            <div className={styles['input-group']}>
              <label>ID:</label>
              <input 
                type="text" 
                value={keyInfo.id} 
                onChange={(e) => handleKeyInfoChange('id', e.target.value)}
                placeholder="ID"
                disabled={selectedKeys.length + selectedKnobs.length + selectedImageAreas.length !== 1}
              />
            </div>
            
            <div className={styles['input-group']}>
              <label>标签:</label>
              <input 
                type="text" 
                value={keyInfo.label} 
                onChange={(e) => handleKeyInfoChange('label', e.target.value)}
                placeholder="标签"
                disabled={selectedKeys.length + selectedKnobs.length + selectedImageAreas.length !== 1}
              />
            </div>
          </div>
          
          <div className={styles['button-group']}>
            <button 
              className={styles['apply-btn']} 
              onClick={handleApplyDimensions}
              disabled={selectedKeys.length + selectedKnobs.length + selectedImageAreas.length === 0}
            >
              应用尺寸
            </button>
            
            <button 
              className={styles['apply-btn']} 
              onClick={handleApplyPosition}
              disabled={selectedKeys.length + selectedKnobs.length + selectedImageAreas.length === 0}
            >
              应用位置
            </button>
            
            <button 
              className={styles['apply-btn']} 
              onClick={handleApplyKeyInfo}
              disabled={selectedKeys.length + selectedKnobs.length + selectedImageAreas.length !== 1}
            >
              应用ID和标签
            </button>
          </div>
        </Section>
      </ControlCard>
      
      {/* 3. 批量操作模块 */}
      <ControlCard title="批量操作">
        
        <SelectedInfoPanel 
          selectedKeys={selectedKeys} 
          selectedKnobs={selectedKnobs}
          selectedImageAreas={selectedImageAreas}
          onClearAllSelections={onClearAllSelections}
        />
        
        <Section title="批量调整">
          
          {/* 步长调整 */}
          <div className={styles['input-group']}>
            <label>移动步长 (u):</label>
            <input 
              type="number" 
              value={moveStep} 
              onChange={(e) => handleStepChange(e.target.value)}
              step="0.1"
              min="0.1"
              max="1"
            />
          </div>
          
          <div className={styles['button-group']}>
            <button 
              className={styles['move-btn']} 
              onClick={() => handleBatchMove(-1, 0)}
            >
              左移
            </button>
            <button 
              className={styles['move-btn']} 
              onClick={() => handleBatchMove(1, 0)}
            >
              右移
            </button>
            <button 
              className={styles['move-btn']} 
              onClick={() => handleBatchMove(0, -1)}
            >
              上移
            </button>
            <button 
              className={styles['move-btn']} 
              onClick={() => handleBatchMove(0, 1)}
            >
              下移
            </button>
          </div>
          
          <div className={styles['button-group']}>
            <button 
              className={styles['remove-btn']} 
              onClick={() => {
                onBatchRemoveKeys();
                onBatchRemoveKnobs();
                onBatchRemoveImageAreas();
              }}
              disabled={selectedKeys.length === 0 && selectedKnobs.length === 0 && selectedImageAreas.length === 0}
            >
              删除
            </button>
          </div>
      </Section>
    </ControlCard>
      
      {/* 4. 其他模块 */}
      <ControlCard title="其他">
        {/* 添加新按键 */}
        <Section title="添加新按键">
          {/* 移除了.input-row容器，改为上下布局 */}
          <div className={styles['input-group']}>
            <label>按键ID:</label>
            <input 
              type="text" 
              value={newKeyInfo.id} 
              onChange={(e) => handleNewKeyInfoChange('id', e.target.value)}
              placeholder="自动生成ID"
            />
          </div>
          
          <div className={styles['input-group']}>
            <label>按键标签:</label>
            <input 
              type="text" 
              value={newKeyInfo.label} 
              onChange={(e) => handleNewKeyInfoChange('label', e.target.value)}
              placeholder="NEW"
              style={{ marginTop: '10px' }}
            />
          </div>
          <div className={styles['button-group']}>
            <button 
              className={styles['add-btn']} 
              onClick={handleAddKey}
            >
              添加新按键
            </button>
          </div>
        </Section>
        
        <Section title="添加旋钮和名牌">
          <div className={styles['button-group']}>
            <button 
              className={styles['add-btn']} 
              onClick={() => {
                onAddKnob({
                  label: 'KNOB',
                  width: 1,
                  height: 1,
                  x: 0,
                  y: 0,
                  color: 'default'
                });
              }}
            >
              添加旋钮
            </button>
            <button 
              className={styles['add-btn']} 
              onClick={() => {
                onAddImageArea({
                  label: 'BRAND',
                  width: 2,
                  height: 1,
                  x: 0,
                  y: 0,
                  color: 'default'
                });
              }}
            >
              添加名牌
            </button>
          </div>
        </Section>
      </ControlCard>
    </ControlPanelContainer>
  );
};

export default KeyDesignPanel;