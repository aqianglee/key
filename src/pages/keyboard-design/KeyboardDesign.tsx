import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './KeyboardDesign.module.less';
import UnifiedKeyboard from '../../components/UnifiedKeyboard/UnifiedKeyboard';
import KeyDesignPanel from '../../components/KeyDesignPanel/KeyDesignPanel';
import KeyboardContainer from '../../components/KeyboardContainer';
import { useKeyboard } from '../../contexts/KeyboardContext';
import KeyboardModel from '../../models/KeyboardModel';
import { useKeySelection } from '../../hooks/useKeySelection';

const KeyboardDesign: React.FC = () => {
  const { keyboard: globalKeyboard } = useKeyboard();
  
  // 复制全局键盘数据到本地状态
  const [localKeyboard, setLocalKeyboard] = useState<KeyboardModel>({
    ...globalKeyboard,
    width: globalKeyboard.width || 23, // 默认宽度，单位u
    height: globalKeyboard.height || 6, // 默认高度，单位u
    margin: globalKeyboard.margin || 20 // 默认外边距，单位px
  });
  
  // 使用自定义hook管理键选择和编辑
  const keySelection = useKeySelection(localKeyboard.keys);
  
  // 键盘名称输入状态
  const [keyboardName, updateKeyboardName] = useState(localKeyboard.name || '');
  
  // 鼠标框选状态
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const keyboardRef = useRef<HTMLDivElement>(null);
  
  // 键盘尺寸状态
  const [keyboardDimensions, setKeyboardDimensions] = useState({
    width: localKeyboard.width || 23,
    height: localKeyboard.height || 6,
    margin: localKeyboard.margin || 20,
    uValue: localKeyboard.uValue || 52,
    padding: localKeyboard.padding || 1
  });
  
  // 当全局键盘数据变化时，更新本地数据
  useEffect(() => {
    setLocalKeyboard({
      ...globalKeyboard,
      keys: [...globalKeyboard.keys],
      width: globalKeyboard.width,
      height: globalKeyboard.height,
      margin: globalKeyboard.margin
    });
    setKeyboardDimensions({
      width: globalKeyboard.width || 23,
      height: globalKeyboard.height || 6,
      margin: globalKeyboard.margin || 20,
      uValue: globalKeyboard.uValue || 52,
      padding: globalKeyboard.padding || 1
    });
    updateKeyboardName(globalKeyboard.name || '');
    // 直接更新keySelection的keys状态
    keySelection.setKeys([...globalKeyboard.keys]);
  }, [globalKeyboard, keySelection.setKeys]);
  
  // 导出键盘配置为JSON
  const handleExportKeyboard = () => {
    const exportData = {
      ...localKeyboard,
      name: keyboardName || localKeyboard.name
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `${keyboardName || 'keyboard'}_${new Date().getTime()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };
  
  // 当键列表变化时，更新本地键盘模型
  useEffect(() => {
    setLocalKeyboard(prev => ({
      ...prev,
      keys: keySelection.keys
    }));
  }, [keySelection.keys]);
  
  // 处理旋钮选择
  const handleToggleKnobSelection = useCallback((knobId: string) => {
    setLocalKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.id === knobId ? { ...knob, isSelected: !knob.isSelected } : knob
      )
    }));
  }, []);
  
  // 处理图片区域选择
  const handleToggleImageAreaSelection = useCallback((imageAreaId: string) => {
    setLocalKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.id === imageAreaId ? { ...imageArea, isSelected: !imageArea.isSelected } : imageArea
      )
    }));
  }, []);
  
  // 处理所有类型组件的选择切换
  const handleToggleSelection = useCallback((componentId: string) => {
    // 尝试切换键选择
    keySelection.toggleKeySelection(componentId);
    // 尝试切换旋钮选择
    handleToggleKnobSelection(componentId);
    // 尝试切换图片区域选择
    handleToggleImageAreaSelection(componentId);
  }, [keySelection.toggleKeySelection, handleToggleKnobSelection, handleToggleImageAreaSelection]);
  
  // 获取选中的旋钮
  const getSelectedKnobs = useCallback(() => {
    return localKeyboard.knobs.filter(knob => knob.isSelected);
  }, [localKeyboard.knobs]);
  
  // 获取选中的图片区域
  const getSelectedImageAreas = useCallback(() => {
    return localKeyboard.imageAreas.filter(imageArea => imageArea.isSelected);
  }, [localKeyboard.imageAreas]);
  
  // 批量移动旋钮
  const batchUpdateKnobPosition = useCallback((xOffset: number, yOffset: number) => {
    setLocalKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.isSelected ? { 
          ...knob, 
          x: Math.round((knob.x + xOffset) * 100) / 100, 
          y: Math.round((knob.y + yOffset) * 100) / 100 
        } : knob
      )
    }));
  }, []);
  
  // 批量移动图片区域
  const batchUpdateImageAreaPosition = useCallback((xOffset: number, yOffset: number) => {
    setLocalKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.isSelected ? { 
          ...imageArea, 
          x: Math.round((imageArea.x + xOffset) * 100) / 100, 
          y: Math.round((imageArea.y + yOffset) * 100) / 100 
        } : imageArea
      )
    }));
  }, []);
  
  // 当localKeyboard变化时，更新keyboardDimensions，保持数据一致
  useEffect(() => {
    setKeyboardDimensions({
      width: localKeyboard.width || 23,
      height: localKeyboard.height || 6,
      margin: localKeyboard.margin || 20,
      uValue: localKeyboard.uValue || 52,
      padding: localKeyboard.padding || 1
    });
  }, [localKeyboard]);
  
  // 开始绘制选区
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 检查点击目标是否是按键或按键容器
    const isKey = e.target instanceof Element && (e.target.closest('.key-container') || e.target.classList.contains('key'));
    
    // 只有在点击键盘区域空白处时才开始绘制选区
    if (!isKey) {
      setIsDrawing(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setStartX(e.clientX - rect.left);
      setStartY(e.clientY - rect.top);
      setEndX(e.clientX - rect.left);
      setEndY(e.clientY - rect.top);
    }
  };
  
  // 更新选区大小
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      setEndX(e.clientX - rect.left);
      setEndY(e.clientY - rect.top);
    }
  };
  
  // 结束绘制，选择区域内的按键
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      
      // 计算鼠标移动距离
      const distance = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );
      
      // 如果移动距离大于20px，认为是框选操作
      if (distance > 20) {
        // 计算选区的边界
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);
        
        // 获取 u 单位值，使用 localKeyboard.uValue 或默认值 52
      const uValue = localKeyboard.uValue || 52;
        
        // 转换为 u 单位的边界
        const uMinX = minX / uValue;
        const uMaxX = maxX / uValue;
        const uMinY = minY / uValue;
        const uMaxY = maxY / uValue;
        
        // 选择区域内的按键
        keySelection.selectKeysByArea(uMinX, uMaxX, uMinY, uMaxY);
        
        // 选择区域内的旋钮
        setLocalKeyboard(prev => ({
          ...prev,
          knobs: prev.knobs.map(knob => {
            const knobLeft = knob.x;
            const knobRight = knob.x + knob.width;
            const knobTop = knob.y;
            const knobBottom = knob.y + knob.height;
            
            // 如果旋钮与选择区域有重叠，则选中
            const isInArea = knobLeft < uMaxX && knobRight > uMinX && knobTop < uMaxY && knobBottom > uMinY;
            
            return {
              ...knob,
              isSelected: isInArea
            };
          })
        }));
        
        // 选择区域内的图片区域
        setLocalKeyboard(prev => ({
          ...prev,
          imageAreas: prev.imageAreas.map(imageArea => {
            const imageAreaLeft = imageArea.x;
            const imageAreaRight = imageArea.x + imageArea.width;
            const imageAreaTop = imageArea.y;
            const imageAreaBottom = imageArea.y + imageArea.height;
            
            // 如果图片区域与选择区域有重叠，则选中
            const isInArea = imageAreaLeft < uMaxX && imageAreaRight > uMinX && imageAreaTop < uMaxY && imageAreaBottom > uMinY;
            
            return {
              ...imageArea,
              isSelected: isInArea
            };
          })
        }));
      }
      // 否则，认为是点选操作，不执行任何选择
      // 这样点选事件会冒泡到按键，触发按键的选择逻辑
    }
  };
  
  // 更新键盘尺寸
  const handleUpdateKeyboardDimensions = () => {
    setLocalKeyboard(prev => ({
      ...prev,
      width: keyboardDimensions.width,
      height: keyboardDimensions.height,
      margin: keyboardDimensions.margin,
      uValue: keyboardDimensions.uValue,
      padding: keyboardDimensions.padding
    }));
  };
  
  // 更新键盘尺寸输入
  const handleKeyboardDimensionChange = (field: 'width' | 'height' | 'margin' | 'uValue' | 'padding', value: string) => {
    const numValue = parseFloat(value) || 0;
    setKeyboardDimensions(prev => ({
      ...prev,
      [field]: numValue
    }));
  };
  
  // 计算选区样式
  const getSelectionStyle = () => {
    const minX = Math.min(startX, endX);
    const minY = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    return {
      position: 'absolute' as const,
      left: `${minX}px`,
      top: `${minY}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: '1px dashed #3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      pointerEvents: 'none' as const,
      zIndex: 1000,
      display: isDrawing ? 'block' : 'none'
    };
  };
  
  return (
    <KeyboardContainer>
      {/* 设计面板 */}
      <KeyDesignPanel 
        selectedKeys={keySelection.getSelectedKeys()}
        selectedKnobs={getSelectedKnobs()}
        selectedImageAreas={getSelectedImageAreas()}
        onUpdateKeyDimensions={keySelection.updateKeyDimensions}
        onBatchUpdateKeyDimensions={keySelection.batchUpdateKeyDimensions}
        onUpdateKeyPosition={keySelection.updateKeyPosition}
        onBatchUpdateKeyPosition={keySelection.batchUpdateKeyPosition}
        onUpdateKeyLabel={keySelection.updateKeyLabel}
        onUpdateKeyId={keySelection.updateKeyId}
        onAddKey={keySelection.addKey}
        onBatchRemoveKeys={keySelection.batchRemoveKeys}
        
        onUpdateKnobDimensions={(knobId, width, height) => {
          setLocalKeyboard(prev => ({
            ...prev,
            knobs: prev.knobs.map(knob => 
              knob.id === knobId ? { ...knob, width, height } : knob
            )
          }));
        }}
        onBatchUpdateKnobDimensions={(width, height) => {
          setLocalKeyboard(prev => ({
            ...prev,
            knobs: prev.knobs.map(knob => 
              knob.isSelected ? { ...knob, width, height } : knob
            )
          }));
        }}
        onUpdateKnobPosition={(knobId, x, y) => {
          setLocalKeyboard(prev => ({
            ...prev,
            knobs: prev.knobs.map(knob => 
              knob.id === knobId ? { ...knob, x, y } : knob
            )
          }));
        }}
        onBatchUpdateKnobPosition={batchUpdateKnobPosition}
        onAddKnob={(knob) => {
          const newKnob = {
            ...knob,
            id: `knob_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            isSelected: false
          };
          setLocalKeyboard(prev => ({
            ...prev,
            knobs: [...prev.knobs, newKnob]
          }));
        }}
        onBatchRemoveKnobs={() => {
          setLocalKeyboard(prev => ({
            ...prev,
            knobs: prev.knobs.filter(knob => !knob.isSelected)
          }));
        }}
        
        onUpdateImageAreaDimensions={(imageAreaId, width, height) => {
          setLocalKeyboard(prev => ({
            ...prev,
            imageAreas: prev.imageAreas.map(imageArea => 
              imageArea.id === imageAreaId ? { ...imageArea, width, height } : imageArea
            )
          }));
        }}
        onBatchUpdateImageAreaDimensions={(width, height) => {
          setLocalKeyboard(prev => ({
            ...prev,
            imageAreas: prev.imageAreas.map(imageArea => 
              imageArea.isSelected ? { ...imageArea, width, height } : imageArea
            )
          }));
        }}
        onUpdateImageAreaPosition={(imageAreaId, x, y) => {
          setLocalKeyboard(prev => ({
            ...prev,
            imageAreas: prev.imageAreas.map(imageArea => 
              imageArea.id === imageAreaId ? { ...imageArea, x, y } : imageArea
            )
          }));
        }}
        onBatchUpdateImageAreaPosition={batchUpdateImageAreaPosition}
        onAddImageArea={(imageArea) => {
          const newImageArea = {
            ...imageArea,
            id: `image-area_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            isSelected: false
          };
          setLocalKeyboard(prev => ({
            ...prev,
            imageAreas: [...prev.imageAreas, newImageArea]
          }));
        }}
        onBatchRemoveImageAreas={() => {
          setLocalKeyboard(prev => ({
            ...prev,
            imageAreas: prev.imageAreas.filter(imageArea => !imageArea.isSelected)
          }));
        }}
        
        onClearAllSelections={keySelection.clearAllSelections}
        keyboardDimensions={keyboardDimensions}
        onUpdateKeyboardDimensions={handleUpdateKeyboardDimensions}
        onKeyboardDimensionChange={handleKeyboardDimensionChange}
        keyboardName={keyboardName}
        onKeyboardNameChange={(name) => {
          updateKeyboardName(name);
          // 只修改本地键盘名称，不修改全局状态，避免触发useEffect覆盖本地修改
          setLocalKeyboard(prev => ({
            ...prev,
            name: name
          }));
        }}
        onExportKeyboard={handleExportKeyboard}
        onImportKeyboard={(data) => {
          setLocalKeyboard(data);
          updateKeyboardName(data.name || '');
          keySelection.setKeys(data.keys);
        }}
      />
      
      {/* 键盘区域 */}
      <div className={styles['keyboard-area']}>
        <div 
          className={`${styles['keyboard']} ${styles[`${localKeyboard.panelColor}`]}`}
          ref={keyboardRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <UnifiedKeyboard 
            keyboard={localKeyboard} 
            onToggleKeySelection={handleToggleSelection}
          />
          
          {/* 选区覆盖层 */}
          <div style={getSelectionStyle()} />
        </div>
      </div>
    </KeyboardContainer>
  );
};

export default KeyboardDesign;