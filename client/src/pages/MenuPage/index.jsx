import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { Btn } from '../../component/Btn';
import { WelcomePage } from '../WelcomePage';
import { useEffect, useState } from 'react';

export const MenuPage = () => {
  const [startGame, setStartGame] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => setStartGame(!startGame), 2000);
  }, [])

  return (
    <>
    {startGame?(
      <WelcomePage/>

    ):(
      <div className={styles.container}>
           <img src="../assets/LogoSmall.svg" width={'370px'}/>
           <div className={styles.btn} onClick={() => navigate('/chooseplayer', {state:{solo:true}})} >
                      <Btn>
                          <p className={styles.text} >PLAY SOLO</p>
                      </Btn>
                  </div>
                  <div className={styles.btn} onClick={() => navigate('/joingame')} >
                      <Btn>
                          <p className={styles.text} >PLAY WITH A FRIEND</p>
                      </Btn>
                  </div>
            <img onClick={() =>{  navigate('/setting')}} className={styles.settingBtn} src="../../../assets/setting.svg" width={'80px'} />
      </div>
    )}
    </>
  )
}
