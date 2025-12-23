// 旋钮的数据模型
export default interface KnobModel {
  // 旋钮的唯一标识符
  id: string;
  // 旋钮的宽度（u单位）
  width: number;
  // 旋钮的高度（u单位）
  height: number;
  // 旋钮的x坐标（u单位）
  x: number;
  // 旋钮的y坐标（u单位）
  y: number;
  // 旋钮的颜色类型
  color: string;
  // 旋钮是否被选中
  isSelected: boolean;
  // 旋钮的标签
  label?: string;
}
