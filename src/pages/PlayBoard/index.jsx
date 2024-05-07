import { useNavigate } from 'react-router-dom';
import { Board } from '../../component/Board';
import { Btn } from '../../component/Btn';
import { Square } from '../../component/Square';
import styles from './style.module.scss';
import { useContext, useState } from 'react';
import { PlayerContext2 } from '../../App';

export const PlayBoard = ({ }) => {
    const { player, setPlayer } = useContext(PlayerContext2)
    const navigate = useNavigate();
    const [isXTurn, setIsXTurn] = useState(player == 'X' ? true : false);
    const [steps, setSteps] = useState(0);

    const [size, setSize] = useState(0);
    const [board, setBoard] = useState([]);
    
    
    const handleClick = (e) => {
        console.log(e.target.value);
        const s = Number(e.target.value)
        setSize(s);
        setBoard(Array(s * s).fill(null))
    };
    
    const play = (i) => {
        if (!board[i]) {
            let newBoard = [...board];
            newBoard[i] = isXTurn ? 'X' : 'O';
            setBoard(newBoard);
            setIsXTurn(!isXTurn);
            setSteps(steps + 1);
            const winner = checkBoard(newBoard, i)
            winner&& console.log( '@@@@@@@ WINNER @@@@@@@@@@@@@',winner);
        };
    }




    const checkColumn = (newBoard, colume) => {
        const player = isXTurn ? 'X' : 'O'
        for (let i = 0; i < size; i++) {
            if (newBoard[colume] !== (player)) return
            colume += size;
        }
        return player ;
    }


    const checkRow = (newBoard, row) => {
        const player = isXTurn ? 'X' : 'O'
        row = Math.floor(row * size) ;
        for (let i = 0; i < size; i++) {
            if (newBoard[row] !== (player))return
            row++
        }
        return player
    }
    const checkMainDiagonal = (newBoard, index) => {
        const player = isXTurn ? 'X' : 'O'
        const row = Math.floor(index / size)
        const colume = Math.floor(index % size);
        index = 0;
        
       
        for (let i = 0; i < size; i++) {
            if (newBoard[index] !== (player))return
            index+= size +1;
        }
        return player;}
        
        const checkSeconderyDiagonal = (newBoard, index) => {
            const player = isXTurn ? 'X' : 'O' 
            console.log(index % (size -1) == 0);
            
            index = size -1;
            for (let i = 0; i < size; i++) {
                
                if (newBoard[index] !== (player))return
                index+= size-1;
            }
            return player;
            
        }
        
        
        const checkBoard = (newBoard, index) => {
            const row = Math.floor(index / size)
            const colume = Math.floor(index % size);
            if (steps + 1 >= (size * 2) - 1) {
            const winRow =   checkRow(newBoard, row);
            if(winRow)return winRow;
            const winColumn = checkColumn(newBoard, colume);
            if(winColumn)return winColumn;
            if(row === colume) {
                const diagonalRtl = checkMainDiagonal(newBoard, index);
                if(diagonalRtl) return diagonalRtl;
            }
            if(index % (size -1) === 0){
                const diagonalLtr = checkSeconderyDiagonal(newBoard, index);
                if(diagonalLtr) return diagonalLtr;
            }
            }
    }


    return (
        <div className={styles.container}>
            <span className={styles.buttons}>
                <button value='3' className={styles.text} onClick={handleClick} >3</button>
                <button value='4' className={styles.text} onClick={handleClick} >4</button>
                <button value='5' className={styles.text} onClick={handleClick} >5</button></span>
            <div className={styles.board} style={{ gridTemplateColumns: `repeat( ${size} , 1fr)` }} >
                {size ? [...Array(size * size)].map((_, index) => (
                    <button key={index} className={styles.square} onClick={() => play(index)} >
                        <Square>{board[index] && <img className={styles.img} src={`../../../assets/${board[index]}.svg`} />}</Square>
                    </button>
                )) : null}

            </div>
            <div className={styles.btn} onClick={() => { setPlayer(null); navigate(-1) }} >
                <Btn>
                    <p className={styles.text} >BACK</p>
                </Btn>
            </div>

        </div>
    )

}
                // const array = new Array(size);
                // for (let i = 0; i < size; i++) {
                //     array[i] = new Array(size);
                // }
                // const handleClick = (e) => setSize(e.target.value);
                // const play = (i) => {
                //     const row = Math.floor(i / size)
                //     const colume = Math.floor(i % size);
                //     setBoard((prevBoard) => {
                //         const newBoard = [...prevBoard]; 
                //         newBoard[row][column] = player1; 
                //         return newBoard; 
                //     });
                //     console.log(board);
                // };
                // for (let i = 0; i < size; i++) {
                //     // newBoard.push(new Array(size).fill(null));
                //     console.log(board[i]);
                // }
            
            
                // const [size, setSize] = useState(0);
                // const matrix = Array.from({ length: size }, () => Array(size).fill(1))
                // const [board, setBoard] = useState( matrix);
                // console.log(board);
                
