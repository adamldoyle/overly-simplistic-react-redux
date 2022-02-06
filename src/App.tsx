import { useProvidedContext } from '@adamldoyle/use-provided-context';
import { IRootState } from './types';
import { Node } from './components/node';
import { ReduxContext } from './redux/context';
import { useDispatch } from './redux/useDispatch';
import { useSelector } from './redux/useSelector';

function App() {
  const { store } = useProvidedContext(ReduxContext);
  const dispatch = useDispatch();
  const nodes = useSelector<IRootState, string[]>((state) => state.rootNodes);

  const logStore = () => {
    console.log(store);
  };

  return (
    <>
      <div>
        <button onClick={() => dispatch({ type: 'ADD_NODE', payload: {} })}>add node</button>
      </div>
      <div style={{ display: 'flex' }}>
        {nodes.map((nodeId) => (
          <Node key={nodeId} id={nodeId} />
        ))}
      </div>
      <div>
        <button onClick={logStore}>log store</button>
      </div>
    </>
  );
}

export default App;
