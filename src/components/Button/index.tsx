import {FaEdit, FaPlus, FaTrash} from 'react-icons/fa';

interface ButtonProps {
  onClick: () => void;
  type: 'add' | 'delete' | 'edit';
}

const Button: React.FC<ButtonProps> = ({onClick, type}) => {
  //
  const renderIcon = () => {
    switch (type) {
      case 'add':
        return <FaPlus />;
      case 'edit':
        return <FaEdit />;
      case 'delete':
        return <FaTrash />;
      default:
        return null;
    }
  };
  //

  return (
    <button onClick={onClick} className={`tree-btn ${type}`}>
      {renderIcon()}
    </button>
  );
};

export default Button;
