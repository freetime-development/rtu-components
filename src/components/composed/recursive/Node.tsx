import { useReplicaContext, useReplicaIndexContext } from './Replicas';
import { RecursiveTree } from './Tree';
import { useElementByType, useVisibilityRule } from './utils';
import { Tree } from '.';
import { Box } from '@/components';

interface NodeProps {
  node: Tree;
}

export const Node = ({ node }: NodeProps) => {
  const Element = useElementByType(node);
  const replicaIndex = useReplicaIndexContext();
  const show = useVisibilityRule(node);
  const showAddReplicaButton =
    node.maxNumberOfReplicas !== null && replicaIndex === 0;
  const showRemoveReplicaButton =
    node.maxNumberOfReplicas !== null && replicaIndex !== 0;
  const { addReplica, removeReplica } = useReplicaContext();

  if (!show) {
    return null;
  }

  return (
    <Box key={node.key} className="relative my-5  p-5">
      {showAddReplicaButton && (
        <button
          type="button"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-9/10"
          onClick={addReplica}
        >
          <i className="icon-plus text-sm text-gray-7" />
        </button>
      )}
      {showRemoveReplicaButton && (
        <button
          type="button"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-9/10"
          onClick={removeReplica}
        >
          <i className="icon-minus text-sm text-gray-7" />
        </button>
      )}
      {Element}
      {node.children.length > 0 && <RecursiveTree tree={node.children} />}
    </Box>
  );
};

Node.displayName = 'Node';
