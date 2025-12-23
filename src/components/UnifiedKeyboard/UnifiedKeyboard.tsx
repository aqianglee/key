import React, { useCallback } from "react";
import Key from "../Key/Key";
import Knob from "../Knob/Knob";
import ImageArea from "../ImageArea/ImageArea";
import styles from "./UnifiedKeyboard.module.less";
import { useKeyboard } from "../../contexts/KeyboardContext";
import KeyboardModel from "../../models/KeyboardModel";

interface UnifiedKeyboardProps {
  keyboard?: KeyboardModel;
  onToggleKeySelection?: (keyId: string) => void;
}

const UnifiedKeyboard: React.FC<UnifiedKeyboardProps> = ({ keyboard: customKeyboard, onToggleKeySelection }) => {
  const { keyboard: globalKeyboard, toggleKeySelection: globalToggle, toggleKnobSelection, toggleImageAreaSelection } = useKeyboard();
  // 使用自定义键盘数据，如果没有则使用全局键盘数据
  const keyboard = customKeyboard || globalKeyboard;
  
  // 处理所有类型组件的选择切换
  const handleToggleSelection = useCallback((componentId: string) => {
    if (onToggleKeySelection) {
      // 如果传递了自定义回调，则使用它
      onToggleKeySelection(componentId);
    } else {
      // 否则使用全局的选择切换函数
      // 尝试切换键选择
      globalToggle(componentId);
      // 尝试切换旋钮选择
      toggleKnobSelection(componentId);
      // 尝试切换图片区域选择
      toggleImageAreaSelection(componentId);
    }
  }, [onToggleKeySelection, globalToggle, toggleKnobSelection, toggleImageAreaSelection]);

  // 计算键盘样式
  const keyboardStyle = {
    width: keyboard.width ? `calc(${keyboard.width} * var(--u, 52px))` : undefined,
    height: keyboard.height ? `calc(${keyboard.height} * var(--u, 52px))` : undefined,
    margin: keyboard.margin ? `${keyboard.margin}px` : undefined,
    '--u': `${keyboard.uValue || 52}px`,
    '--key-padding': `${keyboard.padding || 1}px`
  };

  return (
    <div className={styles.keyboard} style={keyboardStyle}>
      {/* 渲染键 */}
      {keyboard.keys.map(key => {
        return (
          <Key
            key={key.id}
            id={key.id}
            label={key.label}
            width={key.width}
            height={key.height}
            x={key.x}
            y={key.y}
            color={key.color}
            isSelected={key.isSelected}
            onToggleSelection={handleToggleSelection}
            keyboardDefaultColor={keyboard.defaultKeyColor}
          />
        );
      })}
      
      {/* 渲染旋钮 */}
      {keyboard.knobs && keyboard.knobs.map(knob => {
        return (
          <Knob
            key={knob.id}
            id={knob.id}
            width={knob.width}
            height={knob.height}
            x={knob.x}
            y={knob.y}
            color={knob.color}
            isSelected={knob.isSelected}
            onToggleSelection={handleToggleSelection}
            keyboardDefaultColor={keyboard.defaultKeyColor}
            label={knob.label}
          />
        );
      })}
      
      {/* 渲染图片区域 */}
      {keyboard.imageAreas && keyboard.imageAreas.map(imageArea => {
        return (
          <ImageArea
            key={imageArea.id}
            id={imageArea.id}
            width={imageArea.width}
            height={imageArea.height}
            x={imageArea.x}
            y={imageArea.y}
            color={imageArea.color}
            isSelected={imageArea.isSelected}
            onToggleSelection={handleToggleSelection}
            keyboardDefaultColor={keyboard.defaultKeyColor}
            imageUrl={imageArea.imageUrl}
            label={imageArea.label}
          />
        );
      })}
    </div>
  );
};

export default UnifiedKeyboard;