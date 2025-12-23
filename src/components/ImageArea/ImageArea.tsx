import React from "react";
import styles from "./ImageArea.module.less";
import ImageAreaModel from "../../models/ImageAreaModel";

interface ImageAreaComponentProps extends ImageAreaModel {
  onToggleSelection?: (imageAreaId: string) => void;
  keyboardDefaultColor?: string;
}

const ImageArea: React.FC<ImageAreaComponentProps> = ({
  id,
  width = 1,
  height = 1,
  x,
  y,
  color = 'default',
  isSelected = false,
  onToggleSelection,
  keyboardDefaultColor = 'default',
  imageUrl,
  label
}) => {
  // 获取图片区域的颜色，优先使用自身的颜色，然后是键盘默认颜色
  const displayType = color || keyboardDefaultColor;

  const handleClick = () => {
    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getImageAreaClassName = (areaType: string): string => {
    switch (areaType) {
      case "premium":
        return styles["image-area-premium"];
      case "metal":
        return styles["image-area-metal"];
      case "blue":
        return styles["image-area-blue"];
      case "green":
        return styles["image-area-green"];
      case "red":
        return styles["image-area-red"];
      case "orange":
        return styles["image-area-orange"];
      case "purple":
        return styles["image-area-purple"];
      case "navy":
        return styles["image-area-navy"];
      case "sky":
        return styles["image-area-sky"];
      case "matcha":
        return styles["image-area-matcha"];
      case "light-matcha":
        return styles["image-area-light-matcha"];
      case "sakura":
        return styles["image-area-sakura"];
      case "champagne":
        return styles["image-area-champagne"];
      case "lavender":
        return styles["image-area-lavender"];
      case "obsidian":
        return styles["image-area-obsidian"];
      case "deep-coffee":
        return styles["image-area-deep-coffee"];
      case "light-coffee":
        return styles["image-area-light-coffee"];
      case "milk-white":
        return styles["image-area-milk-white"];
      default:
        return styles["image-area-default"];
    }
  };

  // 将u单位转换为px
  const uToPx = (uValue: number): string => {
    return `calc(var(--u, 52px) * ${uValue})`;
  };

  const imageAreaStyle = {
    width: uToPx(width),
    height: uToPx(height),
    left: uToPx(x),
    top: uToPx(y),
  };

  const className = `${getImageAreaClassName(displayType)} ${isSelected ? styles.selected : ""}`;

  return (
    <div style={imageAreaStyle} className={styles["image-area-container"]}>
      <div className={className} onClick={handleClick}>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={label || "Image"} 
            className={styles["image-area-image"]} 
          />
        )}
        {label && <span className={styles["image-area-label"]}>{label}</span>}
        {isSelected && <div className={styles["selected-indicator"]}>✓</div>}
      </div>
    </div>
  );
};

export default ImageArea;
