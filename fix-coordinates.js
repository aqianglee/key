import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 数据文件路径
const dataDirPath = path.join(__dirname, 'src', 'data');

// 获取所有JSON文件
const getAllJsonFiles = async () => {
  const files = await fs.readdir(dataDirPath);
  return files.filter(file => file.endsWith('.json')).map(file => path.join(dataDirPath, file));
};

// 修正坐标函数
const fixCoordinate = (value) => {
  return Math.round(value * 100) / 100;
};

// 主函数
async function fixCoordinates() {
  try {
    // 获取所有JSON文件
    const jsonFiles = await getAllJsonFiles();
    
    // 处理每个文件
    for (const dataFilePath of jsonFiles) {
      console.log(`正在处理文件: ${path.basename(dataFilePath)}`);
      
      // 读取数据文件
      const rawData = await fs.readFile(dataFilePath, 'utf8');
      const keyboardData = JSON.parse(rawData);

      // 修正所有按键的坐标
      if (keyboardData.keys && Array.isArray(keyboardData.keys)) {
        keyboardData.keys.forEach(key => {
          key.x = fixCoordinate(key.x);
          key.y = fixCoordinate(key.y);
        });

        // 写入修正后的数据
        await fs.writeFile(dataFilePath, JSON.stringify(keyboardData, null, 2), 'utf8');
        console.log(`文件 ${path.basename(dataFilePath)} 处理完成！`);
      } else {
        console.log(`文件 ${path.basename(dataFilePath)} 没有 keys 数组，跳过处理。`);
      }
    }

    console.log('所有文件坐标修正完成！所有 x 和 y 坐标已保留1位小数。');
  } catch (error) {
    console.error('修正坐标时出错:', error);
  }
}

// 执行主函数
fixCoordinates();