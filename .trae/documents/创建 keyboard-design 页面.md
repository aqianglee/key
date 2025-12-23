## 实现计划

### 1. 创建新页面组件
- 在 `src/pages` 目录下创建 `keyboard-design` 文件夹
- 创建 `KeyboardDesign.tsx`、`KeyboardDesign.module.less` 和 `index.tsx` 文件

### 2. 实现页面布局
- 采用上下布局，与 keyboard-customize 类似
- 上方为编辑区域，下方为键盘展示区域
- 导入并使用现有的 UnifiedKeyboard 组件

### 3. 创建新的控制面板组件
- 在 `src/components` 目录下创建 `KeyDesignPanel` 组件
- 用于编辑按键的宽、高、x、y 等值
- 支持单选和多选操作

### 4. 扩展 useKeySelection hook
- 添加批量更新按键尺寸的功能：`batchUpdateKeyDimensions`
- 添加批量更新按键位置的功能：`batchUpdateKeyPosition`
- 添加批量删除按键的功能：`batchRemoveKeys`
- 添加批量选择按键的功能：`selectMultipleKeys`

### 5. 实现页面状态管理
- 在页面组件中创建本地状态，复制当前 context 中的数据
- 使用 useState 管理本地键盘数据
- 实现数据的复制和初始化逻辑

### 6. 实现按键编辑功能
- 支持选中单个或多个按键
- 实现按键宽、高、x、y 的编辑输入框
- 实现更新按钮，应用编辑后的数值

### 7. 实现按键管理功能
- 添加添加新按键的功能
- 添加删除选中按键的功能
- 实现批量移动按键的功能（上下左右移动）
- 实现批量调整按键大小的功能

### 8. 样式设计
- 为新页面创建样式文件
- 为控制面板设计直观的 UI
- 实现选中状态的视觉反馈

### 9. 导出组件
- 在 `index.tsx` 中导出新组件
- 确保组件可以被正确导入和使用

## 技术要点

1. **数据复制**：进入页面时复制 context 中的数据，避免直接修改全局状态
2. **批量操作**：通过扩展 hook 实现高效的批量操作
3. **状态管理**：使用 React 状态管理本地数据，与全局状态解耦
4. **用户体验**：提供直观的编辑界面和清晰的操作反馈
5. **组件复用**：尽可能复用现有的组件和逻辑

## 文件结构

```
src/
├── pages/
│   └── keyboard-design/
│       ├── KeyboardDesign.tsx
│       ├── KeyboardDesign.module.less
│       └── index.tsx
└── components/
    └── KeyDesignPanel/
        ├── KeyDesignPanel.tsx
        ├── KeyDesignPanel.module.less
        └── index.tsx
```