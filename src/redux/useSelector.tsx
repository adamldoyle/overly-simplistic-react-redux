import { useEffect, useState, useRef } from 'react';
import { useProvidedContext } from '@adamldoyle/use-provided-context';
import { ReduxContext } from './context';
import { Selector } from './types';

export function useSelector<StateType, ReturnType>(selector: Selector<StateType, ReturnType>): ReturnType {
  const { store } = useProvidedContext(ReduxContext);
  const cachedRef = useRef(selector(store.state));
  const [cached, setCached] = useState(cachedRef.current);

  useEffect(() => {
    const handleChange = () => {
      const newValue = selector(store.state);
      if (newValue !== cachedRef.current) {
        cachedRef.current = newValue;
        setCached(newValue);
      }
    };
    window.addEventListener('redux:state:change', handleChange);
    return () => {
      window.removeEventListener('redux:state:change', handleChange);
    };
  }, [store, selector]);

  return cached;
}
