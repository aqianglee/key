// 颜色按钮选择器属性接口
export default interface ColorButtonSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  colorLabelMap: Record<string, string>;
  containerClassName?: string;
  buttonClassName?: string;
  isDisabled?: boolean;
}
