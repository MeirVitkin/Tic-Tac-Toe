import { createContext, useEffect, useState } from "react"
import { MenuPage } from "./pages/MenuPage"
import { WelcomePage } from "./pages/WelcomePage"
import { ChoosePlayerPage } from "./pages/ChoosePlayerPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PlayBoard } from "./pages/PlayBoard";
export const PlayerContext2 = createContext(true)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
  },
  {
    path: "chooseplayer",
    element: <ChoosePlayerPage />,
  },
  {
    path: "playboard",
    element: <PlayBoard />,
  },
]);


function App() {
  const [startGame, setStartGame] = useState(true);
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    setTimeout(() => setStartGame(!startGame), 2000);
  }, [])
  return (
    <PlayerContext2.Provider value={{ player, setPlayer }}>
      <div>
        <RouterProvider router={router} />
        {/* <ChoosePlayerPage/>  */}
        {/* {startGame ? (
        <WelcomePage />
      ):<MenuPage />} */}

      </div>
    </PlayerContext2.Provider>
  )
}

export default App
