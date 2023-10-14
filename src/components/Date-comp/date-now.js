import { useState, useEffect } from "react";

export default function ShowDate() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);


    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  return <p className="clock">{formattedTime}</p>;
}
