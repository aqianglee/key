import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.less';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h1>Keyboard App</h1>
      <p>Welcome to the Keyboard App!</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate('/keyboard-customize')}>
          Go to Keyboard Customize
        </button>
        <button className={styles.button} onClick={() => navigate('/keyboard-design')}>
          Go to Keyboard Design
        </button>
        <button className={styles.button} onClick={() => navigate('/test')}>
          Go to Test Page
        </button>
      </div>
    </div>
  );
};

export default Home;