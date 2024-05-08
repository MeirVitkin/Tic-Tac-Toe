import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { Loader } from '../../component/Loader'

export const Waiting = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img onClick={() =>{  navigate(-1)}} className={styles.back} src="../../../assets/backBtn.png" width={'80px'} />
      <div className={styles.border}>
        <span className={styles.text} > YOUR CODE</span>
        <div className={styles.code} >{Math.floor(Math.random() * 900000) + 100000}</div>
      </div>
      <Loader/>
      <div className={styles.text} > WAITING FOR OPPONENT</div>


    </div>
  )
}
