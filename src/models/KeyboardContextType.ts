// 键盘上下文类型接口
import KeyboardModel from './KeyboardModel';
import KeyType from './KeyType';
import KeyModel from './KeyModel';
import KnobModel from './KnobModel';
import ImageAreaModel from './ImageAreaModel';

export default interface KeyboardContextType {
  // 完整的键盘数据模型
  keyboard: KeyboardModel;
  
  // 更新键盘边框颜色
  setKeyboardBorderColor: (color: KeyType) => void;
  
  // 更新键盘面板颜色
  setKeyboardPanelColor: (color: KeyType) => void;
  
  // 更新键盘默认键颜色
  setKeyboardDefaultKeyColor: (color: KeyType) => void;
  
  // 更新键盘名称
  setKeyboardName: (name: string) => void;
  
  // 加载键盘布局
  loadKeyboardLayout: (layout: KeyboardModel) => void;
  
  // 键管理
  toggleKeySelection: (keyId: string) => void;
  setKeyColor: (keyId: string, color: KeyType) => void;
  updateKeyDimensions: (keyId: string, width: number, height: number) => void;
  batchUpdateKeyDimensions: (width: number, height: number) => void;
  batchUpdateKeyPosition: (xOffset: number, yOffset: number) => void;
  batchRemoveKeys: () => void;
  addKey: (key: Omit<KeyModel, 'id' | 'isSelected'>) => void;
  removeKey: (keyId: string) => void;
  
  // 旋钮管理
  toggleKnobSelection: (knobId: string) => void;
  setKnobColor: (knobId: string, color: KeyType) => void;
  updateKnobDimensions: (knobId: string, width: number, height: number) => void;
  batchUpdateKnobDimensions: (width: number, height: number) => void;
  batchUpdateKnobPosition: (xOffset: number, yOffset: number) => void;
  batchRemoveKnobs: () => void;
  addKnob: (knob: Omit<KnobModel, 'id' | 'isSelected'>) => void;
  removeKnob: (knobId: string) => void;
  
  // 图片区域管理
  toggleImageAreaSelection: (imageAreaId: string) => void;
  setImageAreaColor: (imageAreaId: string, color: KeyType) => void;
  updateImageAreaDimensions: (imageAreaId: string, width: number, height: number) => void;
  batchUpdateImageAreaDimensions: (width: number, height: number) => void;
  batchUpdateImageAreaPosition: (xOffset: number, yOffset: number) => void;
  batchRemoveImageAreas: () => void;
  addImageArea: (imageArea: Omit<ImageAreaModel, 'id' | 'isSelected'>) => void;
  removeImageArea: (imageAreaId: string) => void;
  
  // 通用管理
  clearAllSelections: () => void;
  
  // 获取选中的组件
  getSelectedKeys: () => KeyModel[];
  getSelectedKnobs: () => KnobModel[];
  getSelectedImageAreas: () => ImageAreaModel[];
  getSelectedKeysByArea: (area: string) => KeyModel[];
  
  // 获取组件信息
  getKeyById: (keyId: string) => KeyModel | undefined;
  getKnobById: (knobId: string) => KnobModel | undefined;
  getImageAreaById: (imageAreaId: string) => ImageAreaModel | undefined;
  getKeyColor: (keyId: string) => KeyType;
}
