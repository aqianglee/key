import React, { createContext, useContext, useState, useCallback } from 'react';
import { useKeySelection } from '../hooks/useKeySelection';
import KeyType from '../models/KeyType';
import KeyboardContextType from '../models/KeyboardContextType';
import KeyboardProviderProps from '../models/KeyboardProviderProps';
import KeyboardModel from '../models/KeyboardModel';
import KeyModel from '../models/KeyModel';
import KnobModel from '../models/KnobModel';
import ImageAreaModel from '../models/ImageAreaModel';
import defaultKeyboardData from '../data/Default.json';

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);


export const KeyboardProvider: React.FC<KeyboardProviderProps> = ({ children }) => {
  // 直接定义可用颜色列表
  const availableColors: KeyType[] = ["default", "blue", "green", "red", "orange", "purple", "navy", "sky", "matcha", "sakura", "champagne", "lavender", "obsidian", "light-matcha", "deep-coffee", "light-coffee", "milk-white"] as KeyType[];

  // 使用Default.json中的数据初始化键列表
  const initialKeys: KeyModel[] = defaultKeyboardData.keys as KeyModel[];
  // 使用Default.json中的数据初始化旋钮列表
  const initialKnobs: KnobModel[] = (defaultKeyboardData.knobs || []) as KnobModel[];
  // 使用Default.json中的数据初始化图片区域列表
  const initialImageAreas: ImageAreaModel[] = (defaultKeyboardData.imageAreas || []) as ImageAreaModel[];
  
  // 使用useKeySelection hook管理键
  const keySelection = useKeySelection(initialKeys);
  
  // 键盘状态管理 - 使用Default.json中的数据
  const [keyboard, setKeyboard] = useState<KeyboardModel>({
    id: defaultKeyboardData.id,
    name: defaultKeyboardData.name,
    borderColor: defaultKeyboardData.borderColor as KeyType,
    panelColor: defaultKeyboardData.panelColor as KeyType,
    defaultKeyColor: defaultKeyboardData.defaultKeyColor as KeyType,
    keys: initialKeys,
    knobs: initialKnobs,
    imageAreas: initialImageAreas,
    availableColors,
    width: defaultKeyboardData.width,
    height: defaultKeyboardData.height,
    margin: defaultKeyboardData.margin,
    uValue: defaultKeyboardData.uValue,
    padding: defaultKeyboardData.padding
  });
  
  // 更新键盘边框颜色
  const setKeyboardBorderColor = useCallback((color: KeyType) => {
    setKeyboard(prev => ({
      ...prev,
      borderColor: color
    }));
  }, []);
  
  // 更新键盘面板颜色
  const setKeyboardPanelColor = useCallback((color: KeyType) => {
    setKeyboard(prev => ({
      ...prev,
      panelColor: color
    }));
  }, []);
  
  // 更新键盘默认键颜色
  const setKeyboardDefaultKeyColor = useCallback((color: KeyType) => {
    setKeyboard(prev => ({
      ...prev,
      defaultKeyColor: color
    }));
  }, []);
  
  // 更新键盘名称
  const setKeyboardName = useCallback((name: string) => {
    setKeyboard(prev => ({
      ...prev,
      name: name
    }));
  }, []);
  
  // 加载键盘布局
  const loadKeyboardLayout = useCallback((layout: KeyboardModel) => {
    // 加载新布局时，保留原有的availableColors，不使用导入数据中的availableColors
    setKeyboard({
      ...layout,
      availableColors: availableColors // 使用当前上下文中的availableColors，而不是导入数据中的
    });
    // 更新键选择状态
    keySelection.setKeys(layout.keys || []);
  }, [keySelection.setKeys, availableColors]);
  
  // 当键列表变化时，更新键盘模型中的键列表
  React.useEffect(() => {
    setKeyboard(prev => ({
      ...prev,
      keys: keySelection.keys
    }));
  }, [keySelection.keys]);
  
  // 旋钮管理方法
  const toggleKnobSelection = useCallback((knobId: string) => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.id === knobId ? { ...knob, isSelected: !knob.isSelected } : knob
      )
    }));
  }, []);
  
  const setKnobColor = useCallback((knobId: string, color: KeyType) => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.id === knobId ? { ...knob, color } : knob
      )
    }));
  }, []);
  
  const updateKnobDimensions = useCallback((knobId: string, width: number, height: number) => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.id === knobId ? { ...knob, width, height } : knob
      )
    }));
  }, []);
  
  const batchUpdateKnobDimensions = useCallback((width: number, height: number) => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.map(knob => 
        knob.isSelected ? { ...knob, width, height } : knob
      )
    }));
  }, []);
  
  const batchUpdateKnobPosition = useCallback((xOffset: number, yOffset: number) => {
    setKeyboard(prev => ({
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
  
  const batchRemoveKnobs = useCallback(() => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.filter(knob => !knob.isSelected)
    }));
  }, []);
  
  const addKnob = useCallback((knob: Omit<KnobModel, 'id' | 'isSelected'>) => {
    const newKnob: KnobModel = {
      ...knob,
      id: `knob_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      isSelected: false
    };
    
    setKeyboard(prev => ({
      ...prev,
      knobs: [...prev.knobs, newKnob]
    }));
  }, []);
  
  const removeKnob = useCallback((knobId: string) => {
    setKeyboard(prev => ({
      ...prev,
      knobs: prev.knobs.filter(knob => knob.id !== knobId)
    }));
  }, []);
  
  // 图片区域管理方法
  const toggleImageAreaSelection = useCallback((imageAreaId: string) => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.id === imageAreaId ? { ...imageArea, isSelected: !imageArea.isSelected } : imageArea
      )
    }));
  }, []);
  
  const setImageAreaColor = useCallback((imageAreaId: string, color: KeyType) => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.id === imageAreaId ? { ...imageArea, color } : imageArea
      )
    }));
  }, []);
  
  const updateImageAreaDimensions = useCallback((imageAreaId: string, width: number, height: number) => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.id === imageAreaId ? { ...imageArea, width, height } : imageArea
      )
    }));
  }, []);
  
  const batchUpdateImageAreaDimensions = useCallback((width: number, height: number) => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.map(imageArea => 
        imageArea.isSelected ? { ...imageArea, width, height } : imageArea
      )
    }));
  }, []);
  
  const batchUpdateImageAreaPosition = useCallback((xOffset: number, yOffset: number) => {
    setKeyboard(prev => ({
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
  
  const batchRemoveImageAreas = useCallback(() => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.filter(imageArea => !imageArea.isSelected)
    }));
  }, []);
  
  const addImageArea = useCallback((imageArea: Omit<ImageAreaModel, 'id' | 'isSelected'>) => {
    const newImageArea: ImageAreaModel = {
      ...imageArea,
      id: `image-area_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      isSelected: false
    };
    
    setKeyboard(prev => ({
      ...prev,
      imageAreas: [...prev.imageAreas, newImageArea]
    }));
  }, []);
  
  const removeImageArea = useCallback((imageAreaId: string) => {
    setKeyboard(prev => ({
      ...prev,
      imageAreas: prev.imageAreas.filter(imageArea => imageArea.id !== imageAreaId)
    }));
  }, []);
  
  // 通用管理方法
  const clearAllSelections = useCallback(() => {
    setKeyboard(prev => ({
      ...prev,
      keys: prev.keys.map(key => ({ ...key, isSelected: false })),
      knobs: prev.knobs.map(knob => ({ ...knob, isSelected: false })),
      imageAreas: prev.imageAreas.map(imageArea => ({ ...imageArea, isSelected: false }))
    }));
  }, []);
  
  // 获取选中的组件
  const getSelectedKnobs = useCallback(() => {
    return keyboard.knobs.filter(knob => knob.isSelected);
  }, [keyboard.knobs]);
  
  const getSelectedImageAreas = useCallback(() => {
    return keyboard.imageAreas.filter(imageArea => imageArea.isSelected);
  }, [keyboard.imageAreas]);
  
  // 获取组件信息
  const getKnobById = useCallback((knobId: string) => {
    return keyboard.knobs.find(knob => knob.id === knobId);
  }, [keyboard.knobs]);
  
  const getImageAreaById = useCallback((imageAreaId: string) => {
    return keyboard.imageAreas.find(imageArea => imageArea.id === imageAreaId);
  }, [keyboard.imageAreas]);
  


  const contextValue: KeyboardContextType = {
    keyboard,
    setKeyboardBorderColor,
    setKeyboardPanelColor,
    setKeyboardDefaultKeyColor,
    setKeyboardName,
    loadKeyboardLayout,
    // 键管理
    toggleKeySelection: keySelection.toggleKeySelection,
    setKeyColor: keySelection.setKeyColor,
    updateKeyDimensions: keySelection.updateKeyDimensions,
    batchUpdateKeyDimensions: keySelection.batchUpdateKeyDimensions,
    batchUpdateKeyPosition: keySelection.batchUpdateKeyPosition,
    batchRemoveKeys: keySelection.batchRemoveKeys,
    addKey: keySelection.addKey,
    removeKey: keySelection.removeKey,
    // 旋钮管理
    toggleKnobSelection,
    setKnobColor,
    updateKnobDimensions,
    batchUpdateKnobDimensions,
    batchUpdateKnobPosition,
    batchRemoveKnobs,
    addKnob,
    removeKnob,
    // 图片区域管理
    toggleImageAreaSelection,
    setImageAreaColor,
    updateImageAreaDimensions,
    batchUpdateImageAreaDimensions,
    batchUpdateImageAreaPosition,
    batchRemoveImageAreas,
    addImageArea,
    removeImageArea,
    // 通用管理
    clearAllSelections,
    // 获取选中的组件
    getSelectedKeys: keySelection.getSelectedKeys,
    getSelectedKnobs,
    getSelectedImageAreas,
    getSelectedKeysByArea: keySelection.getSelectedKeysByArea,
    // 获取组件信息
    getKeyById: keySelection.getKeyById,
    getKnobById,
    getImageAreaById,
    getKeyColor: keySelection.getKeyColor
  };

  return (
    <KeyboardContext.Provider value={contextValue}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = (): KeyboardContextType => {
  const context = useContext(KeyboardContext);
  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider');
  }
  return context;
};