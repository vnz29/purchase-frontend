import { useEffect, useState } from "react";
import Components1 from "./Components1";

const Components = () => {
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <input type="text" onChange={() => setTimer(10)} />
      <p>You typed: {timer}</p>
      <Components1 timer={timer} />;
    </div>
  );
};

export default Components;
