import { useState, useEffect } from 'react';
import { getTypewriterState } from '../utils/heroLogic';

export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        const nextState = getTypewriterState(text, index);
        setDisplayed(nextState.displayed);
        if (nextState.done) {
          setDone(true);
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
