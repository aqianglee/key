// 图片区域的数据模型
export default interface ImageAreaModel {
  // 图片区域的唯一标识符
  id: string;
  // 图片区域的宽度（u单位）
  width: number;
  // 图片区域的高度（u单位）
  height: number;
  // 图片区域的x坐标（u单位）
  x: number;
  // 图片区域的y坐标（u单位）
  y: number;
  // 图片区域的颜色类型
  color: string;
  // 图片区域是否被选中
  isSelected: boolean;
  // 图片URL
  imageUrl?: string;
  // 图片区域的标签
  label?: string;
}
