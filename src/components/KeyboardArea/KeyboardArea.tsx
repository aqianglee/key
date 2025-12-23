import React from "react";
import UnifiedKeyboard from "../UnifiedKeyboard/UnifiedKeyboard";
import styles from "./KeyboardArea.module.less";
import { useKeyboard } from "../../contexts/KeyboardContext";

const KeyboardArea: React.FC = () => {
  const { keyboard } = useKeyboard();
  
  return (
    <div className={`${styles.keyboard} ${styles[`${keyboard.panelColor}`]}`}>
      <UnifiedKeyboard />
    </div>
  );
};

export default KeyboardArea;
