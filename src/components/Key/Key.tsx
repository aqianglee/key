import React from "react";
import styles from "./Key.module.less";
import KeyProps from "../../models/KeyProps";

interface KeyComponentProps extends KeyProps {
  onToggleSelection?: (keyId: string) => void;
  keyboardDefaultColor?: string;
}

const Key: React.FC<KeyComponentProps> = ({
  id,
  label,
  width = 1,
  height = 1,
  x,
  y,
  color = 'default',
  isSelected = false,
  onToggleSelection,
  keyboardDefaultColor = 'default'
}) => {
  // 获取键的颜色，优先使用键自身的颜色，然后是键盘默认颜色
  const displayType = color || keyboardDefaultColor;

  const handleClick = () => {
    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getKeyClassName = (keyType: string): string => {
    switch (keyType) {
      case "premium":
        return styles["key-premium"];
      case "metal":
        return styles["key-metal"];
      case "blue":
        return styles["key-blue"];
      case "green":
        return styles["key-green"];
      case "red":
        return styles["key-red"];
      case "orange":
        return styles["key-orange"];
      case "purple":
        return styles["key-purple"];
      case "navy":
        return styles["key-navy"];
      case "sky":
        return styles["key-sky"];
      case "matcha":
        return styles["key-matcha"];
      case "light-matcha":
        return styles["key-light-matcha"];
      case "sakura":
        return styles["key-sakura"];
      case "champagne":
        return styles["key-champagne"];
      case "lavender":
        return styles["key-lavender"];
      case "obsidian":
        return styles["key-obsidian"];
      case "deep-coffee":
        return styles["key-deep-coffee"];
      case "light-coffee":
        return styles["key-light-coffee"];
      case "milk-white":
        return styles["key-milk-white"];
      default:
        return styles["key-default"];
    }
  };

  // 将u单位转换为px
  const uToPx = (uValue: number): string => {
    return `calc(var(--u, 52px) * ${uValue})`;
  };

  const keyStyle = {
    width: uToPx(width),
    height: uToPx(height),
    left: uToPx(x),
    top: uToPx(y),
  };

  const labelClassName =
    label.length > 2 ? styles["key-label-small"] : styles["key-label"];

  const className = `${getKeyClassName(displayType)} ${
    isSelected ? styles.selected : ""
  }`;

  return (
    <div style={keyStyle} className={styles["key-container"]}>
      <div className={className} onClick={handleClick}>
        <span className={labelClassName}>{label}</span>
        {isSelected && <div className={styles["selected-indicator"]}>✓</div>}
      </div>
    </div>
  );
};

export default Key;