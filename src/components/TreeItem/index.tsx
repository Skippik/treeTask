import {useState} from 'react';
import {UserTreeType} from '../../types';
import Button from '../Button';
import {FaChevronDown, FaChevronRight} from 'react-icons/fa';

interface TreeItemProps {
  item: UserTreeType;
  onEdit: (node: UserTreeType) => void;
  onDelete: (nodeId: number) => void;
  onAdd: (nodeId: number) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({item, onEdit, onDelete, onAdd}) => {
  //
  const [isOpen, setIsOpen] = useState(true);
  //
  return (
    <li className='tree-item'>
      <div className='tree-node'>
        {item.children.length > 0 && (
          <button className='toggle-btn' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        )}
        <span className='tree-label'>{item.name}</span>
        <Button type='edit' onClick={() => onEdit(item)} />
        <Button type='delete' onClick={() => onDelete(item.id)} />
        <Button type='add' onClick={() => onAdd(item.id)} />
      </div>
      {isOpen && item.children.length > 0 && (
        <ul className='tree-children'>
          {item.children.map(child => (
            <TreeItem
              key={child.id}
              item={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeItem;
