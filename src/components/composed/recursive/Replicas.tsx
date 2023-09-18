import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Node } from './Node';
import { Tree } from './types';

interface ReplicaProviderProps {
  replicas: Tree[];
}

const initialContext = {
  addReplica: () => {},
  removeReplica: () => {},
};
const replicaIndexContext = null;
const ReplicaContext = createContext(initialContext);
const ReplicaIndexContext = createContext<number | null>(replicaIndexContext);
export const useReplicaContext = () => useContext(ReplicaContext);
export const useReplicaIndexContext = () => useContext(ReplicaIndexContext);

export function ReplicaProvider({ replicas }: ReplicaProviderProps) {
  const [activeReplicas, setActiveReplicas] = useState([replicas[0]]);

  const addReplica = useCallback(() => {
    if (activeReplicas.length === replicas.length) {
      return;
    }
    setActiveReplicas(prev => [...prev, replicas[prev.length]]);
  }, [replicas, activeReplicas]);

  const removeReplica = useCallback(() => {
    setActiveReplicas(prev => prev.slice(0, prev.length - 1));
  }, []);

  const value = useMemo(
    () => ({
      addReplica,
      removeReplica,
    }),
    [addReplica, removeReplica],
  );

  return (
    <ReplicaContext.Provider value={value}>
      {activeReplicas.map((node, i) => (
        <ReplicaIndexContext.Provider key={node.key} value={i}>
          <Node node={node} />
        </ReplicaIndexContext.Provider>
      ))}
    </ReplicaContext.Provider>
  );
}
