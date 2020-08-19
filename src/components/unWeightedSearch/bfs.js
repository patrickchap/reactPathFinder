import Queue from "../queue/queue";
export default function bfs(grid, start, goal) {
  let shortestPath = [];
  let visitedNodes = [];

  let startNode = start;
  let goalGoal = goal;
  startNode.isVisited = true;

  let queue = new Queue();
  queue.enqueue(startNode);

  while (queue.getLength() !== 0) {
    let curr = queue.dequeue();

    if (curr === goalGoal) {
      var node = goalGoal;
      console.log(node);
      //if goal is found set camefrom nodes to pink to show the shortes path starting node
      while (node.nodeComeFrom !== startNode) {
        node = node.nodeComeFrom;
        shortestPath.push(node);
      }
      return { visitedNodes, shortestPath };
    }

    for (let x = 0; x < curr.neighbors.length; x++) {
      if (!curr.neighbors[x].isVisited) {
        curr.neighbors[x].isVisited = true;
        if (curr.neighbors[x] !== goalGoal) {
          visitedNodes.push(curr.neighbors[x]);
        }
        curr.neighbors[x].nodeComeFrom = curr;
        queue.enqueue(curr.neighbors[x]);
      }
    }
  }
}
