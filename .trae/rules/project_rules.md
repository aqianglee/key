# 组件规则

## 组件结构
所有组件必须遵循以下结构：

```
组件名/
├── 组件名.tsx       # 组件主要实现文件
├── 组件名.module.less  # 组件样式文件
└── index.tsx        # 组件导出文件
```

## 规则说明
1. 每个组件必须是一个独立的文件夹
2. 文件夹名必须与组件名一致
3. 组件文件夹内至少包含三个文件：
   - 组件名.tsx：包含组件的主要实现
   - 组件名.module.less：包含组件的样式定义
   - index.tsx：用于导出组件，简化导入路径
4. 组件样式必须使用 CSS Modules
5. 组件导出必须使用默认导出

## 示例
```
Button/
├── Button.tsx
├── Button.module.less
└── index.tsx
```

index.tsx 内容示例：
```typescript
import Button from './Button';
export default Button;
```

## 导入方式
使用简化的导入路径：
```typescript
import Button from '../Button';
```

# 页面级组件规则

## 页面级组件结构
所有页面级组件必须遵循以下结构：

```
pages/
├── 页面文件夹名/   # 页面文件夹，全小写使用"-"分割
│   ├── 组件名.tsx       # 组件主要实现文件，使用大写驼峰
│   ├── 组件名.module.less  # 组件样式文件，使用大写驼峰
│   └── index.tsx        # 组件导出文件
```

## 规则说明
1. 页面级组件必须存放在 `src/pages` 目录下
2. 页面文件夹名必须使用全小写，单词之间使用"-"分割
3. 页面文件夹内的组件文件命名规则与常规组件一致，使用大写驼峰
4. 页面级组件文件夹内至少包含三个文件：
   - 组件名.tsx：包含页面组件的主要实现
   - 组件名.module.less：包含页面组件的样式定义
   - index.tsx：用于导出页面组件，简化导入路径
5. 页面组件样式必须使用 CSS Modules
6. 页面组件导出必须使用默认导出
7. 每个页面级组件对应一个可通过 URL 访问的页面

## 示例
```
pages/
├── keyboard-customize/
│   ├── KeyboardCustomize.tsx
│   ├── KeyboardCustomize.module.less
│   └── index.tsx
```

index.tsx 内容示例：
```typescript
import KeyboardCustomize from './KeyboardCustomize';
export default KeyboardCustomize;
```

## 导入方式
使用简化的导入路径：
```typescript
import KeyboardCustomize from '../pages/keyboard-customize';
```

# 主题规则

## 主题结构
所有主题样式必须遵循以下结构：

```
styles/
├── themes/           # 主题根目录
│   ├── 颜色名/       # 颜色主题目录
│   │   ├── key.less      # 按键组件样式
│   │   ├── panel.less    # 面板组件样式
│   │   └── button.less   # 颜色按钮样式
```

## 规则说明
1. 主题样式必须放在 `src/styles/themes` 目录下
2. 每种颜色主题必须是一个独立的文件夹
3. 颜色主题文件夹内必须包含三个文件：
   - `key.less`：按键组件的颜色样式
   - `panel.less`：面板组件的颜色样式
   - `button.less`：颜色按钮选择器的颜色样式
4. 所有主题文件必须使用 LESS 语法
5. 主题样式应使用全局颜色常量（定义在 `src/styles/global.less` 中）

## 示例
```
styles/
├── themes/
│   ├── blue/
│   │   ├── key.less
│   │   ├── panel.less
│   │   └── button.less
```

## 创建新主题的步骤
1. 在 `src/styles/themes` 目录下创建新的颜色文件夹（如 `newcolor`）
2. 在新文件夹中创建三个文件：`key.less`、`panel.less`、`button.less`
3. 在 `key.less` 中定义按键组件的颜色样式
4. 在 `panel.less` 中定义面板组件的颜色样式
5. 在 `button.less` 中定义颜色按钮选择器的颜色样式
6. 在需要使用该主题的组件中导入相应的样式文件

## 主题文件内容规范

### key.less 示例
```less
/* 新颜色主题按键样式 */
.key-newcolor {
  .key();
  background: linear-gradient(145deg, @newcolor-light, @newcolor-dark);
  border: 1px solid @newcolor-border;
  font-weight: 600;
  color: @white;
  /* 其他样式... */
}
```

### panel.less 示例
```less
/* 新颜色主题面板样式 */
.newcolor {
  background: linear-gradient(145deg, @newcolor-light, @newcolor-dark);
  border-color: @newcolor-border;
}
```

### button.less 示例
```less
/* 新颜色主题按钮样式 */
.newcolor {
  background: linear-gradient(145deg, @newcolor-light, @newcolor-dark);
  border-color: @newcolor-border;
}
```

## 主题使用方式
在组件的样式文件中导入相应的主题样式：

```less
/* 导入按键主题样式 */
@import '../../styles/themes/newcolor/key.less';

/* 导入面板主题样式 */
@import '../../styles/themes/newcolor/panel.less';

/* 导入按钮主题样式 */
@import '../../styles/themes/newcolor/button.less';
```

## 完整的新主题添加流程

### 第一步：创建主题样式文件
1. 在 `src/styles/themes` 目录下创建新的颜色文件夹（如 `newcolor`）
2. 在新文件夹中创建三个文件：`key.less`、`panel.less`、`button.less`
3. 在 `src/styles/global.less` 中定义新主题的颜色变量

### 第二步：在组件样式文件中导入主题
需要导入新主题样式的组件文件：
- `src/components/Key/Key.module.less` - 导入 `key.less`
- `src/components/KeyboardStylePanel/KeyboardStylePanel.module.less` - 导入 `panel.less`
- `src/components/KeyboardArea/KeyboardArea.module.less` - 导入 `panel.less`
- `src/components/UnifiedKeyboard/UnifiedKeyboard.module.less` - 导入 `panel.less`
- `src/components/ColorButtonSelector/ColorButtonSelector.module.less` - 导入 `button.less`

### 第三步：在组件逻辑中添加主题处理
在 `src/components/Key/Key.tsx` 文件的 `getKeyClassName` 函数中添加新主题的处理：

```typescript
const getKeyClassName = (keyType: string): string => {
  switch (keyType) {
    // ... 其他主题 ...
    case "newcolor":
      return styles["key-newcolor"];
    default:
      return styles["key-default"];
  }
};
```

### 第四步：在状态管理中配置可用颜色
在 `src/contexts/KeyboardContext.tsx` 文件的 `availableColors` 数组中添加新主题：

```typescript
// 直接定义可用颜色列表
const availableColors: KeyType[] = ["default", "blue", "green", "newcolor"] as KeyType[];
```

### 第五步：在颜色标签映射中添加中文名称
在 `src/components/KeyboardCustomizePanel/KeyboardCustomizePanel.tsx` 文件的 `colorLabelMap` 中添加：

```typescript
const colorLabelMap: Record<string, string> = {
  // ... 其他颜色 ...
  "newcolor": "新颜色"
};
```

### 第六步：验证主题完整性
确保以下文件都正确导入了新主题：
- ✅ Key.module.less - 导入 key.less
- ✅ KeyboardStylePanel.module.less - 导入 panel.less  
- ✅ KeyboardArea.module.less - 导入 panel.less
- ✅ UnifiedKeyboard.module.less - 导入 panel.less
- ✅ ColorButtonSelector.module.less - 导入 button.less
- ✅ Key.tsx - 添加主题处理逻辑
- ✅ KeyboardContext.tsx - 添加主题到可用颜色列表
- ✅ KeyboardCustomizePanel.tsx - 添加中文名称映射

### 常见错误排查
1. **主题按钮无效果**：检查 Key.tsx 的 getKeyClassName 函数是否添加了新主题处理
2. **样式未应用**：检查对应的 .module.less 文件是否导入了主题样式
3. **主题未显示在颜色选择器**：检查 KeyboardContext.tsx 的 availableColors 数组
4. **中文名称显示异常**：检查 KeyboardCustomizePanel.tsx 的 colorLabelMap

# 开发实践规则

## 状态管理规则
1. 使用 React Context 进行全局状态管理
2. 状态逻辑封装在自定义 Hook 中（如 useKeySelection）
3. 状态类型必须使用 TypeScript 严格定义
4. 状态更新使用不可变数据模式
5. **可用颜色列表 (availableColors) 直接在 `src/contexts/KeyboardContext.tsx` 中定义，不再存储在 `src/data/Default.json` 中**

## 数据模型规则
1. 所有数据模型必须定义在 `src/models/` 目录下
2. 使用 TypeScript interface 定义数据模型
3. 模型命名使用 PascalCase，如 `KeyModel`
4. 模型文件必须包含完整的类型定义

## 组件交互规则
1. 组件间通信通过 props 和 context 进行
2. 事件处理函数命名使用 handle 前缀，如 `handleClick`
3. 回调函数 props 命名使用 on 前缀，如 `onColorSelect`
4. 避免在组件内部直接操作全局状态

## 样式管理规则
1. 所有样式文件使用 CSS Modules
2. 全局颜色常量定义在 `src/styles/global.less`
3. 组件样式类名使用 kebab-case，如 `keyboard-main`
4. 主题样式类名使用连字符，如 `key-blue`

## 文件组织规则
1. 相关功能模块组织在同一目录下
2. 工具函数放在 `src/hooks/` 目录
3. 布局组件放在 `src/layouts/` 目录
4. 静态资源放在 `src/assets/` 目录

## 代码质量规则
1. 使用 TypeScript 严格模式
2. 组件必须使用 React.FC 类型
3. 避免使用 any 类型
4. 保持函数职责单一