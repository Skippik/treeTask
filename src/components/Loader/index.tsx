import {FaSpinner} from 'react-icons/fa';

const Loader = () => {
  return (
    <div className='loader-overlay'>
      <div className='loader-container'>
        <FaSpinner className='spinner' />
      </div>
    </div>
  );
};

export default Loader;
