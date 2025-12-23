import React from "react";
import { useKeyboard } from "../../contexts/KeyboardContext";
import ColorButtonSelector from "../ColorButtonSelector";
import ControlCard from "../ControlCard";
import styles from "./KeyboardStylePanel.module.less";

const KeyboardStylePanel: React.FC = () => {
  const {
    keyboard,
    setKeyboardDefaultKeyColor,
    setKeyboardPanelColor,
  } = useKeyboard();

  // 颜色英文到中文的映射
  const colorLabelMap: Record<string, string> = {
    default: '默认',
    blue: '蓝',
    green: '绿',
    red: '红',
    orange: '橙',
    purple: '紫',
    navy: '藏青',
    sky: '天空',
    matcha: '抹茶',
    sakura: '樱花',
    champagne: '香槟',
    lavender: '薰衣草',
    obsidian: '黑曜石'
  };

  const handleKeyTypeChange = (type: string) => {
    setKeyboardDefaultKeyColor(type as any);
  };

  const handlePanelColorChange = (color: string) => {
    setKeyboardPanelColor(color as any);
  };

  return (
    <ControlCard>
      <h3>质感选择：</h3>
      <div className={styles["key-type-selector"]}>
        <button
          className={`${styles["type-btn"]} ${keyboard.defaultKeyColor === "default" ? styles.active : ""}`}
          onClick={() => handleKeyTypeChange("default")}
        >
          默认
        </button>
        <button
          className={`${styles["type-btn"]} ${keyboard.defaultKeyColor === "premium" ? styles.active : ""}`}
          onClick={() => handleKeyTypeChange("premium")}
        >
          高级
        </button>
        <button
          className={`${styles["type-btn"]} ${keyboard.defaultKeyColor === "metal" ? styles.active : ""}`}
          onClick={() => handleKeyTypeChange("metal")}
        >
          金属
        </button>
      </div>
      
      <h3>面板颜色：</h3>
      <ColorButtonSelector
        colors={keyboard.availableColors}
        selectedColor={keyboard.panelColor}
        onColorSelect={handlePanelColorChange}
        colorLabelMap={colorLabelMap}
        containerClassName={styles["panel-color-selector"]}
        buttonClassName={styles["color-btn"]}
      />
    </ControlCard>
  );
};

export default KeyboardStylePanel;