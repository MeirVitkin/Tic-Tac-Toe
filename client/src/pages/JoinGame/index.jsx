import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss'
import { Btn } from '../../component/Btn';
import { PlayerContext } from '../../App';
import { useContext, useEffect, useState } from 'react';


export const JoinGame = () => {
  const { socket } = useContext(PlayerContext)
  useEffect(() => { socket.connect() }, [])

  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleJoin = () => {
    socket.emit('join-room', input);
    socket.on('join-room', (foundRoom) => {

      foundRoom ? navigate('/chooseplayer', { state: { solo: false, roomNum: input, creator: false } }) : alert('Room not found')
    })
  }

  const handleCreateGame = () => {

    socket.emit('create-room');
    socket.on('create-room', (number) => {

      navigate('/waiting', { state: { number } })
    })
  }


  return (
    <div className={styles.container}>
      <img onClick={() => { navigate(-1) }} className={styles.back} src="../../../assets/backBtn.png" width={'80px'} />
      <p className={styles.text}>JOIN TO A GAME</p>
      <input
        type="text"
        placeholder='ENTER CODE GAME'
        className={styles.input}
        onChange={(e) => { setInput(e.target.value) }}
      />
      <div className={styles.join} onClick={handleJoin} >
        <Btn>
          <p className={styles.text} >JOIN</p>
        </Btn>
      </div>
      <div className={styles.or_container} >
        <span className={styles.line} ></span>
        <p className={styles.text} >OR </p>
        <span className={styles.line} ></span>
      </div>
      <div className={styles.create_game} onClick={handleCreateGame} >
        <Btn>
          <p className={styles.text} >CREATE A GAME</p>
        </Btn>
      </div>

    </div>
  )
}

