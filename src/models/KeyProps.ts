// 键属性接口
export default interface KeyProps {
  id: string;
  label: string;
  width?: number; // u单位，如1u、1.5u、2u等
  height?: number; // u单位，如1u、1.5u、2u等
  x: number; // 绝对定位的x坐标（u单位）
  y: number; // 绝对定位的y坐标（u单位）
  color?: string; // 键的颜色，默认值为'default'
  isSelected?: boolean; // 是否选中，默认值为false
}
