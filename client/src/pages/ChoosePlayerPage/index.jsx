import { useLocation, useNavigate } from 'react-router-dom'
import { Board } from '../../component/Board'
import { Square } from '../../component/Square'
import styles from './style.module.scss'
import { useContext, useState } from 'react'
import { Btn } from '../../component/Btn'
import { PlayerContext } from '../../App'



export const ChoosePlayerPage = () => {
    const { setPlayer, player } = useContext(PlayerContext)
    const navigate = useNavigate();
    const location = useLocation();
    const { solo, roomNum, creator } = location.state;
    const { socket } = useContext(PlayerContext);
    socket.on('set-player', (play) => setPlayer(prev=>({ ...prev, play })), console.log('on set player',player))
    socket.on('navigate-to-play-board', () => navigate( '/playboard'))


    const choosePlayer = (value) => {
        solo ? (setPlayer((prev)=>({ ...prev, play:value})), console.log(player)) : (socket.emit('choose-player', value, roomNum))
    }
    
    return (
        <div className={styles.container}>
            <img onClick={() => { setPlayer({ ...player, play: null }); navigate(-1) }} className={styles.back} src="../../../assets/backBtn.png" width={'80px'} />
            <p className={styles.text}>CHOOSE PLAYER</p>
            <div className={styles.board} >
                <Board>
                    <div className={styles.square} >
                        <Square>
                            {(!player?.play || player?.play == 'O') ? (<img onClick={() =>{ (creator || solo) && choosePlayer('X')}} src="../../../assets/X.svg" width={player?.play == 'O' ? '120px' : '80px'} />)
                                : (<img src="../../../assets/X_gray.svg" width={'80px'} />)}
                        </Square></div>
                    <div className={styles.square} >
                        <Square>
                            {(!player?.play || player?.play == 'X') ? (<img onClick={() =>{ (creator || solo) && choosePlayer('O')}} src="../../../assets/O.svg" width={player?.play == 'X' ? '120px' : '80px'} />)
                                : (<img src="../../../assets/O_gray.svg" width={'80px'} />)}
                        </Square></div>
                </Board> </div>
            {((player?.play && creator) || (player?.play && solo)) && (
                <div className={styles.btn} onClick={solo ?()=> navigate('/playboardsolo') : () => socket.emit('lets-play')} >
                    <Btn>
                        <p className={styles.text} >LET'S PLSY</p>
                    </Btn>
                </div>
            )}



        </div>
    )
}
