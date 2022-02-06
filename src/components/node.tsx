import { FC, memo, useState, useEffect } from 'react';
import { useDispatch } from '../redux/useDispatch';
import { useSelector } from '../redux/useSelector';
import { IRootState } from '../types';

export type NodeProps = {
  id: string;
};

export const Node: FC<NodeProps> = memo(({ id }) => {
  const dispatch = useDispatch();
  const nodes = useSelector<IRootState, string[]>((state) => state.allNodes[id]);
  const [color, setColor] = useState('white');

  useEffect(() => {
    setColor((prev) => (prev === 'white' ? '#ffcccc' : prev));
    setTimeout(() => {
      setColor('white');
    }, 300);
  }, [id, dispatch, nodes]);

  return (
    <div style={{ border: '1px solid black', margin: 5, padding: 5, backgroundColor: color }}>
      <div>id: {id}</div>
      <div>
        <button onClick={() => dispatch({ type: 'ADD_NODE', payload: { parentId: id } })}>add node</button>
      </div>
      <div style={{ display: 'flex' }}>
        {nodes.map((nodeId) => (
          <Node key={nodeId} id={nodeId} />
        ))}
      </div>
    </div>
  );
});
