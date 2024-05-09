import { useLocation, useNavigate } from 'react-router-dom'
import { Board } from '../../component/Board'
import { Square } from '../../component/Square'
import styles from './style.module.scss'
import { useContext, useState } from 'react'
import { Btn } from '../../component/Btn'
import {PlayerContext} from '../../App'


export const ChoosePlayerPage = () => {
    const { setPlayer, player } = useContext(PlayerContext )
    const navigate = useNavigate();
    const location = useLocation();
     const solo = location.state.solo;
    
    const handleClick = (value) => {
        setPlayer(value)
    }
    return (
        <div className={styles.container}>
            <img onClick={() =>{setPlayer(null);  navigate(-1)}} className={styles.back} src="../../../assets/backBtn.png" width={'80px'} />
            <p className={styles.text}>CHOOSE PLAYER</p>
            <div className={styles.board} >
                <Board>
                    <div className={styles.square} >
                        <Square>
                            {(!player  || player == 'O') ? (<img onClick={()=>handleClick('X')} src="../../../assets/X.svg" width={player == 'O' ? '120px' : '80px'} />)
                                : (<img src="../../../assets/X_gray.svg" width={'80px'} />)}
                        </Square></div>
                    <div className={styles.square} >
                        <Square>
                            {(!player  || player == 'X' )? (<img onClick={()=>handleClick('O')} src="../../../assets/O.svg" width={player == 'X' ? '120px' : '80px'} />)
                                : (<img src="../../../assets/O_gray.svg"  width={'80px'} />)}
                        </Square></div>
                </Board> </div>
            {(player) && (
                <div className={styles.btn} onClick={() => navigate(solo?'/playboardsolo' :'/playboard')} >
                    <Btn>
                        <p className={styles.text} >LET'S PLSY</p>
                    </Btn>
                </div>
            )}



        </div>
    )
}
