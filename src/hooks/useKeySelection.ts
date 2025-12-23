import { useState, useCallback } from 'react';
import KeyType from '../models/KeyType';
import KeyModel from '../models/KeyModel';

// 自定义hook返回类型
interface UseKeySelectionReturn {
  keys: KeyModel[];
  toggleKeySelection: (keyId: string) => void;
  setKeyColor: (keyId: string, color: KeyType) => void;
  updateKeyDimensions: (keyId: string, width: number, height: number) => void;
  batchUpdateKeyDimensions: (width: number, height: number) => void;
  updateKeyPosition: (keyId: string, x: number, y: number) => void;
  batchUpdateKeyPosition: (xOffset: number, yOffset: number) => void;
  updateKeyLabel: (keyId: string, label: string) => void;
  updateKeyId: (keyId: string, newId: string) => void;
  addKey: (key: Omit<KeyModel, 'id' | 'isSelected'>) => void;
  removeKey: (keyId: string) => void;
  batchRemoveKeys: () => void;
  clearAllSelections: () => void;
  getSelectedKeys: () => KeyModel[];
  getSelectedKeysByArea: (area: string) => KeyModel[];
  selectKeysByArea: (minX: number, maxX: number, minY: number, maxY: number) => void;
  getKeyById: (keyId: string) => KeyModel | undefined;
  getKeyColor: (keyId: string) => KeyType;
  setKeys: (newKeys: KeyModel[]) => void;
}

export const useKeySelection = (initialKeys: KeyModel[] = []): UseKeySelectionReturn => {
  // 使用KeyModel数组存储所有键信息，包括选中状态和颜色
  const [keys, updateKeys] = useState<KeyModel[]>(initialKeys);
  
  // 移除了监听initialKeys的useEffect，避免状态循环更新

  // 生成唯一键ID
  const generateKeyId = useCallback(() => {
    return `key_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }, []);

  // 切换键的选中状态
  const toggleKeySelection = useCallback((keyId: string) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, isSelected: !key.isSelected } : key
      )
    );
  }, []);

  // 设置键的颜色
  const setKeyColor = useCallback((keyId: string, color: KeyType) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, color } : key
      )
    );
  }, []);

  // 更新键的尺寸
  const updateKeyDimensions = useCallback((keyId: string, width: number, height: number) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, width, height } : key
      )
    );
  }, []);
  
  // 更新单个键的位置
  const updateKeyPosition = useCallback((keyId: string, x: number, y: number) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 } : key
      )
    );
  }, []);
  
  // 更新键的标签
  const updateKeyLabel = useCallback((keyId: string, label: string) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, label } : key
      )
    );
  }, []);
  
  // 更新键的ID
  const updateKeyId = useCallback((keyId: string, newId: string) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, id: newId } : key
      )
    );
  }, []);

  // 添加新键
  const addKey = useCallback((keyData: Omit<KeyModel, 'id' | 'isSelected'>) => {
    updateKeys(prevKeys => [
      ...prevKeys,
      {
        ...keyData,
        id: generateKeyId(),
        isSelected: false
      }
    ]);
  }, [generateKeyId]);

  // 移除键
  const removeKey = useCallback((keyId: string) => {
    updateKeys(prevKeys => prevKeys.filter(key => key.id !== keyId));
  }, []);

  // 批量更新选中按键的尺寸
  const batchUpdateKeyDimensions = useCallback((width: number, height: number) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.isSelected ? { ...key, width, height } : key
      )
    );
  }, []);

  // 批量更新选中按键的位置
  const batchUpdateKeyPosition = useCallback((xOffset: number, yOffset: number) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => 
        key.isSelected ? { 
          ...key, 
          x: Math.round((key.x + xOffset) * 100) / 100, 
          y: Math.round((key.y + yOffset) * 100) / 100 
        } : key
      )
    );
  }, []);

  // 批量删除选中的按键
  const batchRemoveKeys = useCallback(() => {
    updateKeys(prevKeys => prevKeys.filter(key => !key.isSelected));
  }, []);

  // 清空所有选中状态
  const clearAllSelections = useCallback(() => {
    updateKeys(prevKeys => 
      prevKeys.map(key => ({ ...key, isSelected: false }))
    );
  }, []);

  // 获取所有选中的键
  const getSelectedKeys = useCallback((): KeyModel[] => {
    return keys.filter(key => key.isSelected);
  }, [keys]);

  // 获取指定区域的选中键
  const getSelectedKeysByArea = useCallback((area: string): KeyModel[] => {
    // 根据区域过滤选中的键
    // 这里假设键的id包含区域信息，例如："main_a"、"func_f1"、"numpad_1"
    if (area === "main") {
      return keys.filter(key => key.isSelected && key.id.startsWith("main_"));
    } else if (area === "func") {
      return keys.filter(key => key.isSelected && key.id.startsWith("func_"));
    } else if (area === "numpad") {
      return keys.filter(key => key.isSelected && key.id.startsWith("numpad_"));
    }
    return keys.filter(key => key.isSelected);
  }, [keys]);

  // 根据区域选择按键
  const selectKeysByArea = useCallback((minX: number, maxX: number, minY: number, maxY: number) => {
    updateKeys(prevKeys => 
      prevKeys.map(key => {
        // 检查按键是否在选择区域内
        const keyLeft = key.x;
        const keyRight = key.x + key.width;
        const keyTop = key.y;
        const keyBottom = key.y + key.height;
        
        // 如果按键与选择区域有重叠，则选中
        const isInArea = keyLeft < maxX && keyRight > minX && keyTop < maxY && keyBottom > minY;
        
        return {
          ...key,
          isSelected: isInArea
        };
      })
    );
  }, []);

  // 根据ID获取键
  const getKeyById = useCallback((keyId: string): KeyModel | undefined => {
    return keys.find(key => key.id === keyId);
  }, [keys]);

  // 获取键的颜色
  const getKeyColor = useCallback((keyId: string): KeyType => {
    const key = keys.find(k => k.id === keyId);
    return key?.color || 'default';
  }, [keys]);
  
  // 设置所有键
  const setKeys = useCallback((newKeys: KeyModel[]) => {
    // 使用状态更新函数直接更新keys状态
    updateKeys(newKeys);
  }, []);

  return {
    keys,
    toggleKeySelection,
    setKeyColor,
    updateKeyDimensions,
    batchUpdateKeyDimensions,
    updateKeyPosition,
    batchUpdateKeyPosition,
    updateKeyLabel,
    updateKeyId,
    addKey,
    removeKey,
    batchRemoveKeys,
    clearAllSelections,
    getSelectedKeys,
    getSelectedKeysByArea,
    selectKeysByArea,
    getKeyById,
    getKeyColor,
    setKeys
  };
};