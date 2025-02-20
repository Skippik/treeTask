import {useEffect, useState} from 'react';
import {UserTreeType} from './types';
import axios from 'axios';
import Modal from './components/Modal';
import TreeItem from './components/TreeItem';
import './assets/less/index.less';
import Button from './components/Button';
import Loader from './components/Loader';

const App = () => {
  //
  const [tree, setTree] = useState<UserTreeType>();
  const [selected, setSelected] = useState<UserTreeType>();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [loading, setLoading] = useState(true);
  //
  const getTree = async () => {
    try {
      setLoading(true);
      const resp = await axios.get<UserTreeType>(
        'https://test.vmarmysh.com/api.user.tree.get?treeName=TestTask',
      );
      setLoading(false);

      setTree(resp.data);
    } catch (error) {
      console.error('Ошибка при загрузке дерева', error);
    }
  };
  //
  const deleteItem = async (itemId: number) => {
    if (!tree) {
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        'https://test.vmarmysh.com/api.user.tree.node.delete',
        null,
        {
          params: {
            treeName: tree.name,
            nodeId: itemId,
          },
        },
      );
      setLoading(false);
      getTree();
    } catch (error) {
      console.log(error);
    }
  };
  //

  useEffect(() => {
    getTree();
  }, []);
  //

  return (
    <>
      {loading && <Loader />}
      <div className='tree-wrapper'>
        {openModal && selected && tree && (
          <Modal
            setLoading={setLoading}
            treeName={tree.name}
            type={type}
            item={selected}
            onClose={() => {
              setOpenModal(false);
              getTree();
            }}
          />
        )}
        {tree ? (
          <ul className='tree-ul'>
            <li className='tree-root'>
              <div className='tree-root--wrapper'>
                <span>{tree.name}</span>
                <Button
                  onClick={() => {
                    setSelected({...tree, name: ''});
                    setType('add');
                    setOpenModal(true);
                  }}
                  type='add'
                />
              </div>
              <ul className='tree-children'>
                {tree.children.map(item => (
                  <TreeItem
                    key={item.id}
                    item={item}
                    onEdit={node => {
                      setType('edit');
                      setSelected(node);
                      setOpenModal(true);
                    }}
                    onDelete={itemId => deleteItem(itemId)}
                    onAdd={nodeId => {
                      setSelected({id: nodeId, name: '', children: []});
                      setType('add');
                      setOpenModal(true);
                    }}
                  />
                ))}
              </ul>
            </li>
          </ul>
        ) : (
          <Button
            onClick={() => {
              setSelected({id: 0, name: '', children: []});
              setType('add');
              setOpenModal(true);
            }}
            type='add'
          />
        )}
      </div>
    </>
  );
};

export default App;
