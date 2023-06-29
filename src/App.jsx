import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="large">Start Game</button>
      <button className="menuSelection">Numbers</button>
      <button className="primary">Restart</button>
      <button className="secondary">New Game</button>
    </>
  );
}

export default App;
