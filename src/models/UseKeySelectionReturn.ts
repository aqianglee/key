// 键选择hook返回类型接口
import SelectedKey from './SelectedKey';

export default interface UseKeySelectionReturn {
  selectedKeys: SelectedKey[];
  isKeySelected: (keyId: string) => boolean;
  toggleKeySelection: (keyId: string, label: string, area: string, color: string) => void;
  setKeyColor: (keyId: string, color: string) => void;
  clearSelection: () => void;
  getSelectedKeysByArea: (area: string) => SelectedKey[];
  getKeyColor: (keyId: string) => string;
}
