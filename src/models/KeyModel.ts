// 键的数据模型
import KeyType from './KeyType';

export default interface KeyModel {
  // 键的唯一标识符
  id: string;
  // 键的显示文本
  label: string;
  // 键的宽度（u单位）
  width: number;
  // 键的高度（u单位）
  height: number;
  // 键的x坐标（u单位）
  x: number;
  // 键的y坐标（u单位）
  y: number;
  // 键的颜色类型
  color: KeyType;
  // 键是否被选中
  isSelected: boolean;
}
