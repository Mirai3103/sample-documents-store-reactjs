import { useReducer } from 'react';
import Context from './Context';
import reducer, { initState, init } from './reducer';

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState, init);
  return <Context.Provider value={{ data: [state, dispatch] }}>{children}</Context.Provider>;
}
export default Provider;
