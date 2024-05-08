import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { Btn } from '../../component/Btn';

export const MenuPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
         <img src="../assets/LogoSmall.svg" width={'370px'}/>
         <div className={styles.btn} onClick={() => navigate('/chooseplayer')} >
                    <Btn>
                        <p className={styles.text} >PLAY SOLO</p>
                    </Btn>
                </div>
                <div className={styles.btn} onClick={() => navigate('/joingame')} >
                    <Btn>
                        <p className={styles.text} >PLAY WITH A FRIEND</p>
                    </Btn>
                </div>
    </div>
  )
}
