import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss'
import { Btn } from '../../component/Btn';

export const JoinGame = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
            <img onClick={() =>{ navigate(-1)}} className={styles.back} src="../../../assets/backBtn.png" width={'80px'} />
            <p className={styles.text}>JOIN TO A GAME</p>
            <input type="text" placeholder='ENTER CODE GAME' className={styles.input}/>
            <div className={styles.join} onClick={() => navigate('/playboard')} >
                    <Btn>
                        <p className={styles.text} >JOIN</p>
                    </Btn>
                </div>
                <div className={styles.or_container} >
                  <span className={styles.line} ></span>
                  <p className={styles.text} >OR </p>
                  <span className={styles.line} ></span>
                </div>
                <div className={styles.create_game} onClick={() => navigate('/waiting')} >
                    <Btn>
                        <p className={styles.text} >CREATE A GAME</p>
                    </Btn>
                </div>

    </div>
  )
}

