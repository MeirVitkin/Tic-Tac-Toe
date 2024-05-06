import { Button } from '../../component/Button'
import styles from './style.module.scss'

export const MenuPage
 = () => {
  return (
    <div className={styles.container}>
         <img src="../assets/LogoSmall.svg" width={'370px'}/>
        <Button content={"../assets/btnSolo.svg"}/>
        <Button content={"../assets/btnPlayWithFriends.svg"}/>
    </div>
  )
}
