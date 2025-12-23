import React from "react";
import styles from "./Knob.module.less";
import KnobModel from "../../models/KnobModel";

interface KnobComponentProps extends KnobModel {
  onToggleSelection?: (knobId: string) => void;
  keyboardDefaultColor?: string;
}

const Knob: React.FC<KnobComponentProps> = ({
  id,
  width = 1,
  height = 1,
  x,
  y,
  color = 'default',
  isSelected = false,
  onToggleSelection,
  keyboardDefaultColor = 'default',
  label
}) => {
  // 获取旋钮的颜色，优先使用旋钮自身的颜色，然后是键盘默认颜色
  const displayType = color || keyboardDefaultColor;

  const handleClick = () => {
    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getKnobClassName = (knobType: string): string => {
    switch (knobType) {
      case "premium":
        return styles["knob-premium"];
      case "metal":
        return styles["knob-metal"];
      case "blue":
        return styles["knob-blue"];
      case "green":
        return styles["knob-green"];
      case "red":
        return styles["knob-red"];
      case "orange":
        return styles["knob-orange"];
      case "purple":
        return styles["knob-purple"];
      case "navy":
        return styles["knob-navy"];
      case "sky":
        return styles["knob-sky"];
      case "matcha":
        return styles["knob-matcha"];
      case "light-matcha":
        return styles["knob-light-matcha"];
      case "sakura":
        return styles["knob-sakura"];
      case "champagne":
        return styles["knob-champagne"];
      case "lavender":
        return styles["knob-lavender"];
      case "obsidian":
        return styles["knob-obsidian"];
      case "deep-coffee":
        return styles["knob-deep-coffee"];
      case "light-coffee":
        return styles["knob-light-coffee"];
      case "milk-white":
        return styles["knob-milk-white"];
      default:
        return styles["knob-default"];
    }
  };

  // 将u单位转换为px
  const uToPx = (uValue: number): string => {
    return `calc(var(--u, 52px) * ${uValue})`;
  };

  const knobStyle = {
    width: uToPx(width),
    height: uToPx(height),
    left: uToPx(x),
    top: uToPx(y),
  };

  const className = `${getKnobClassName(displayType)} ${isSelected ? styles.selected : ""}`;

  return (
    <div style={knobStyle} className={styles["knob-container"]}>
      <div className={className} onClick={handleClick}>
        {label && <span className={styles["knob-label"]}>{label}</span>}
        {isSelected && <div className={styles["selected-indicator"]}>✓</div>}
      </div>
    </div>
  );
};

export default Knob;
