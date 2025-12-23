// 键盘的数据模型
import KeyType from './KeyType';
import KeyModel from './KeyModel';
import KnobModel from './KnobModel';
import ImageAreaModel from './ImageAreaModel';

export default interface KeyboardModel {
  // 键盘ID
  id: string;
  // 键盘名称
  name?: string;
  // 边框颜色类型
  borderColor: KeyType;
  // 面板颜色类型
  panelColor: KeyType;
  // 默认键颜色类型
  defaultKeyColor: KeyType;
  // 键盘包含的键列表
  keys: KeyModel[];
  // 键盘包含的旋钮列表
  knobs: KnobModel[];
  // 键盘包含的图片区域列表
  imageAreas: ImageAreaModel[];
  // 可用的颜色预设
  availableColors: KeyType[];
  // 键盘宽度（u单位）
  width?: number;
  // 键盘高度（u单位）
  height?: number;
  // 键盘外边距（px）
  margin?: number;
  // 1u等于多少px
  uValue?: number;
  // 键内部padding（px）
  padding?: number;
}
