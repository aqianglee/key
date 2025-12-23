import React, { useRef, useState, useEffect } from 'react';
import styles from './ImportExportComponent.module.less';
import KeyboardModel from '../../models/KeyboardModel';
import { FaDownload, FaUpload } from 'react-icons/fa';
import { useKeyboard } from '../../contexts/KeyboardContext';

interface ImportExportComponentProps {
  keyboardName: string;
  onKeyboardNameChange: (name: string) => void;
  onExport: () => void;
  onImport: (data: KeyboardModel) => void;
}

const ImportExportComponent: React.FC<ImportExportComponentProps> = ({
  keyboardName,
  onKeyboardNameChange,
  onExport,
  onImport
}) => {
  // 文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 使用键盘上下文
  const { loadKeyboardLayout } = useKeyboard();
  // 配置文件列表
  const [configFiles, setConfigFiles] = useState<{ name: string; data: KeyboardModel }[]>([]);
  // 当前选择的配置文件
  const [selectedConfig, setSelectedConfig] = useState<string>('');

  // 动态加载配置文件
  useEffect(() => {
    const loadConfigFiles = async () => {
      try {
        // 使用 Vite 的 import.meta.glob 动态导入所有配置文件
        const configModules = import.meta.glob('../../data/*.json', { eager: true });
        const files: { name: string; data: KeyboardModel }[] = [];
        
        for (const path in configModules) {
          const module = configModules[path] as { default: KeyboardModel };
          if (module.default && module.default.name) {
            files.push({
              name: module.default.name,
              data: module.default
            });
          }
        }
        
        setConfigFiles(files);
      } catch (error) {
        console.error('Failed to load config files:', error);
      }
    };

    loadConfigFiles();
  }, []);

  // 处理键盘名称变化
  const handleKeyboardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    onKeyboardNameChange(newName);
  };

  // 处理配置文件选择
  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedConfig(selectedName);
    
    const selectedFile = configFiles.find(file => file.name === selectedName);
    if (selectedFile) {
      loadKeyboardLayout(selectedFile.data);
      onKeyboardNameChange(selectedFile.data.name || '');
    }
  };

  // 导出键盘配置为JSON
  const handleExportKeyboard = () => {
    onExport();
  };

  // 导入键盘配置
  const handleImportKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as KeyboardModel;
        onImport(importedData);
      } catch (error) {
        console.error('Failed to parse imported JSON:', error);
        alert('导入失败，请检查JSON文件格式');
      }
    };
    reader.readAsText(file);
    
    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 触发文件选择对话框
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles['import-export-container']}>
      {/* 第一行：选择框和上传按钮 */}
      <div className={styles['row']}>
        {/* 配置文件选择 */}
        <div className={styles['input-group']}>
          <select
            value={selectedConfig}
            onChange={handleConfigChange}
            className={styles['input-field']}
            title="选择键盘配置"
          >
            <option value="">选择配置文件</option>
            {configFiles.map((file) => (
              <option key={file.name} value={file.name}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* 上传按钮 */}
        <div className={styles['button-group']}>
          <button
            className={styles['action-btn']}
            onClick={triggerFileInput}
            title="导入配置"
          >
            <FaUpload />
          </button>
        </div>
      </div>
      
      {/* 第二行：输入框和下载按钮 */}
      <div className={styles['row']}>
        {/* 键盘名称输入 */}
        <div className={styles['input-group']}>
          <input
            type="text"
            value={keyboardName}
            onChange={handleKeyboardNameChange}
            placeholder="输入键盘名称 (如: ALUS S98)"
            className={styles['input-field']}
          />
        </div>
        
        {/* 下载按钮 */}
        <div className={styles['button-group']}>
          <button
            className={styles['action-btn']}
            onClick={handleExportKeyboard}
            title="导出配置"
          >
            <FaDownload />
          </button>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleImportKeyboard}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImportExportComponent;