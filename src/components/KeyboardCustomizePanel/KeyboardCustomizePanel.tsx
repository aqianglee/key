import React, { useState } from "react";
import { useKeyboard } from "../../contexts/KeyboardContext";
import ColorButtonSelector from "../ColorButtonSelector";
import ImportExportComponent from "../ImportExportComponent";
import ControlCard from "../ControlCard";
import Section from "../Section";
import ControlPanelContainer from "../ControlPanelContainer";
import SelectedInfoPanel from "../SelectedInfoPanel";
import styles from "./KeyboardCustomizePanel.module.less";

const KeyboardCustomizePanel: React.FC = () => {
  const {
    keyboard,
    setKeyboardDefaultKeyColor,
    setKeyboardPanelColor,
    setKeyboardName,
    loadKeyboardLayout,
    getSelectedKeys,
    getSelectedKnobs,
    getSelectedImageAreas,
    clearAllSelections,
    setKeyColor,
  } = useKeyboard();

  // 颜色英文到中文的映射
  const colorLabelMap: Record<string, string> = {
    default: "默认",
    blue: "蓝",
    green: "绿",
    red: "红",
    orange: "橙",
    purple: "紫",
    navy: "藏青",
    sky: "天空",
    matcha: "抹茶",
    sakura: "樱花",
    champagne: "香槟",
    lavender: "薰衣草",
    obsidian: "黑曜石",
    "light-matcha": "浅抹茶",
    "deep-coffee": "深咖色",
    "light-coffee": "浅咖色",
    "milk-white": "奶白色"
  };

  // 键盘名称输入状态
  const [keyboardName, updateKeyboardName] = useState(keyboard.name || "");

  // 当键盘名称从其他地方更新时，同步更新本地状态
  React.useEffect(() => {
    if (keyboard.name) {
      updateKeyboardName(keyboard.name);
    }
  }, [keyboard.name]);

  const handleKeyTypeChange = (type: string) => {
    // 设置键盘默认键颜色
    setKeyboardDefaultKeyColor(type as any);
    // 将所有键的颜色更新为所选颜色
    keyboard.keys.forEach((key) => {
      setKeyColor(key.id, type as any);
    });
  };

  const handlePanelColorChange = (color: string) => {
    // 设置键盘面板颜色
    setKeyboardPanelColor(color as any);
  };

  const handleAssignColor = (color: string) => {
    // 为所有选中的键分配颜色
    const selectedKeys = getSelectedKeys();
    selectedKeys.forEach((key) => {
      setKeyColor(key.id, color as any);
    });
    // 设置完颜色后取消所有选中的键
    clearAllSelections();
  };

  // 导出键盘配置为JSON
  const handleExportKeyboard = () => {
    // 导出数据时排除availableColors字段
    const { availableColors, ...exportData } = keyboard;
    exportData.name = keyboardName || keyboard.name;

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportName = `${
      keyboardName || "keyboard"
    }_${new Date().getTime()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportName);
    linkElement.click();
  };

  return (
    <ControlPanelContainer>
      {/* 1. 键盘设置 */}
      <ControlCard title="键盘设置">
        {/* 键盘名称 */}
        <Section title="键盘名称">
          <ImportExportComponent
            keyboardName={keyboardName}
            onKeyboardNameChange={(name) => {
              updateKeyboardName(name);
              setKeyboardName(name);
            }}
            onExport={handleExportKeyboard}
            onImport={(data) => {
              loadKeyboardLayout(data);
              setKeyboardName(data.name || "");
            }}
          />
        </Section>

        {/* 键盘属性 */}
        <Section title="键盘属性">
          <div className={styles["property-grid"]}>
            <div className={styles["property-item"]}>
              <span className={styles["property-label"]}>宽度:</span>
              <span className={styles["property-value"]}>
                {keyboard.width || 23}u
              </span>
            </div>
            <div className={styles["property-item"]}>
              <span className={styles["property-label"]}>高度:</span>
              <span className={styles["property-value"]}>
                {keyboard.height || 6}u
              </span>
            </div>
            <div className={styles["property-item"]}>
              <span className={styles["property-label"]}>外边距:</span>
              <span className={styles["property-value"]}>
                {keyboard.margin || 20}px
              </span>
            </div>
            <div className={styles["property-item"]}>
              <span className={styles["property-label"]}>按键数量:</span>
              <span className={styles["property-value"]}>
                {keyboard.keys.length}
              </span>
            </div>
          </div>
        </Section>
      </ControlCard>

      {/* 2. 颜色选择 */}
      <ControlCard title="颜色选择">
        {/* 面板颜色 */}
        <Section title="面板颜色">
          <ColorButtonSelector
            colors={keyboard.availableColors}
            selectedColor={keyboard.panelColor}
            onColorSelect={handlePanelColorChange}
            colorLabelMap={colorLabelMap}
            containerClassName={styles["color-selector"]}
            buttonClassName={styles["color-btn"]}
          />
        </Section>

        {/* 按键颜色 */}
        <Section title="按键颜色">
          <ColorButtonSelector
            colors={keyboard.availableColors}
            selectedColor={keyboard.defaultKeyColor}
            onColorSelect={handleKeyTypeChange}
            colorLabelMap={colorLabelMap}
            containerClassName={styles["color-selector"]}
            buttonClassName={styles["color-btn"]}
          />
        </Section>
      </ControlCard>

      {/* 3. 选中管理 */}
      <ControlCard title="按键客制化">
        <SelectedInfoPanel
          selectedKeys={getSelectedKeys()}
          selectedKnobs={getSelectedKnobs()}
          selectedImageAreas={getSelectedImageAreas()}
          onClearAllSelections={clearAllSelections}
        />

        <Section title="分配颜色">
          <div className={styles["color-assignment"]}>
            <ColorButtonSelector
              colors={keyboard.availableColors}
              selectedColor=""
              onColorSelect={handleAssignColor}
              colorLabelMap={colorLabelMap}
              buttonClassName={styles["color-assign-btn"]}
              isDisabled={getSelectedKeys().length === 0}
            />
          </div>
        </Section>
      </ControlCard>
    </ControlPanelContainer>
  );
};

export default KeyboardCustomizePanel;