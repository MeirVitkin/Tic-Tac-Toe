import { useNavigate } from 'react-router-dom';
import { Board } from '../../component/Board';
import { Btn } from '../../component/Btn';
import { Square } from '../../component/Square';
import styles from './style.module.scss';
import { useContext, useState } from 'react';
import { PlayerContext } from '../../App';
import { checkBoard } from '../../functions/checkBoard';

export const PlayBoard = ({ }) => {
    const { player, setPlayer, socket } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [isXTurn, setIsXTurn] = useState(player == 'X' ? true : false);
    const [steps, setSteps] = useState(0);
    const [winner, setWinner] = useState(null);
    const [boardSize, setSize] = useState(0);
    const [board, setBoard] = useState([]);
    socket.on('get-board',(boardSize)=>{
        console.log(boardSize);
        setBoard(Array(boardSize * boardSize).fill(null));
        setSize(boardSize)
    })


    const craeteBoard = (e) => {
        const size = Number(e.target.value)
        socket.emit('start-game' , size);

        // setSize(s);
        // setBoard(Array(s * s).fill(null))
    };
    
    const play = (i) => {
        if (!board[i]) {
            const currentPlayer = isXTurn ? 'X' : 'O'
            let newBoard = [...board];
            newBoard[i] = currentPlayer ;
            setBoard(newBoard);
            setIsXTurn(!isXTurn);
            setSteps(steps + 1);
            if (steps + 1 >= (boardSize * 2) - 1) {
                
                const isWin = checkBoard(newBoard, i, boardSize,currentPlayer)
                isWin && (setWinner(currentPlayer));
            }
        };
    }
    
    const restartGame = () => {
        setBoard([]);
        setWinner(null);
        setSize(0);
        setSteps(0);
    }
    
    
    return (
            <div className={styles.container}>
                <span className={styles.buttons}>
                    {winner && <div onClick={restartGame} className={styles.popup}>  THE WINNER IS <img src={`../../../assets/${winner}.svg`} width={'50px'} /> </div>}
                    <button value='3' className={styles.text} onClick={craeteBoard} >3</button>
                    <button value='4' className={styles.text} onClick={craeteBoard} >4</button>
                    <button value='5' className={styles.text} onClick={craeteBoard} >5</button></span>
                <div className={styles.board} style={{ gridTemplateColumns: `repeat( ${boardSize} , 1fr)` }} >
                    {boardSize ? [...Array(boardSize * boardSize)].map((_, index) => (
                        <button key={index} className={styles.square} onClick={() => play(index)} >
                            <Square>{board[index] && <img className={styles.img} src={`../../../assets/${board[index]}.svg`} />}</Square>
                        </button>
                    )) : null}

                </div>
                <div className={styles.btn} onClick={() => { setPlayer( prev =>({...prev,play:null}) ), navigate(-1) }} >
                    <Btn>
                        <p className={styles.text} >BACK</p>
                    </Btn>
                </div>

            </div>
        )

    }
