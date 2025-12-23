import React from "react";
import styles from "./ColorButtonSelector.module.less";
import ColorButtonSelectorProps from '../../models/ColorButtonSelectorProps';


const ColorButtonSelector: React.FC<ColorButtonSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  colorLabelMap,
  containerClassName = styles["color-selector"],
  buttonClassName = styles["color-btn"],
  isDisabled = false,
}) => {
  return (
    <div className={containerClassName}>
      {colors.map((color) => (
        <button
          key={color}
          className={`${buttonClassName} ${styles[color]} ${selectedColor === color ? styles.active : ""}`}
          onClick={() => onColorSelect(color)}
          disabled={isDisabled}
        >
          {colorLabelMap[color]}
        </button>
      ))}
    </div>
  );
};

export default ColorButtonSelector;