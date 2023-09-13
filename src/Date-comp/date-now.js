import { useState, useEffect } from "react";

export default function ShowDate() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every 1 second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  return <p className="clock">{formattedTime}</p>;
}
