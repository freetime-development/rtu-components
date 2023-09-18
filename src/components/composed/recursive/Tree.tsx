import { LoadingSpinner } from '../../base/loaders/LoadingSpinner';
import { Node } from './Node';
import { ReplicaProvider } from './Replicas';
import { Tree } from './types';

interface TreeProps {
  tree: Tree[];
  isLoading?: boolean;
}

function renderTree(tree: Tree[]) {
  const renderTree = [];
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.maxNumberOfReplicas !== null) {
      const replicas = tree.slice(i, i + node.maxNumberOfReplicas);

      renderTree.push(<ReplicaProvider key={node.key} replicas={replicas} />);
      i += node.maxNumberOfReplicas - 1;
    } else {
      renderTree.push(<Node key={node.key} node={node} />);
    }
  }

  return renderTree;
}

export function RecursiveTree({ tree, isLoading }: TreeProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner color="black" />
      </div>
    );
  }

  return <>{renderTree(tree)}</>;
}
