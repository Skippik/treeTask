import {useState} from 'react';
import {UserTreeType} from '../../types';
import axios from 'axios';

//
interface ModalProps {
  item: UserTreeType;
  treeName: string;
  type: 'edit' | 'add';
  onClose: () => void;

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  item,
  type,
  onClose,
  treeName,

  setLoading,
}) => {
  //
  const [newName, setNewName] = useState(item.name);
  //
  const handleActions = async () => {
    try {
      if (type === 'edit' && !!newName.length) {
        setLoading(true);
        await axios.post(
          'https://test.vmarmysh.com/api.user.tree.node.rename',
          null,
          {
            params: {
              treeName: treeName,
              nodeId: item.id,
              newNodeName: newName,
            },
          },
        );
        setLoading(false);
        onClose();
      } else if (type === 'add' && !!newName.length) {
        setLoading(true);
        await axios.post(
          'https://test.vmarmysh.com/api.user.tree.node.create',
          null,
          {
            params: {
              treeName: treeName,
              parentNodeId: item.id,
              nodeName: newName,
            },
          },
        );
        setLoading(false);
      }
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении дерева', error);
    }
  };
  //
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h3>Редактировать узел</h3>
        <input
          placeholder='Имя нового элемента'
          type='text'
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={handleActions}>Сохранить</button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;
