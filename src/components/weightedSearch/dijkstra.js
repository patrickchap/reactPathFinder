export function dijkstra(grid, start, goal) {
  let startNode = start;
  let goalNode = goal;

  let settled = new Set();
  let unSettled = new Set();

  let shortestPath = [];
  let visitedNodes = [];

  startNode.distance = 0;
  unSettled.add(startNode);

  while (unSettled.length !== 0) {
    let curr = minDistance(unSettled);
    unSettled.delete(curr);

    if (curr === goalNode) {
      let node = goalNode;
      //if goal is found set camefrom nodes to pink to show the shortes path starting node
      while (node.nodeComeFrom !== startNode) {
        node = node.nodeComeFrom;
        // node.classification = 'set-path';
        shortestPath.push(node);
      }
      return { visitedNodes, shortestPath };
    }

    curr.neighbors.forEach((element) => {
      let adjacentNode = element;
      if (
        adjacentNode.classification !== "set-weighted-wall" &&
        adjacentNode.classification !== "start-node" &&
        adjacentNode.classification !== "goal-node"
      ) {
        visitedNodes.push(adjacentNode);
      }

      let edgeWeight =
        adjacentNode.classification === "set-weighted-wall" ? 10 : 1;

      if (!settled.has(adjacentNode)) {
        let sourceDistance = curr.distance;
        if (sourceDistance + edgeWeight < adjacentNode.distance) {
          adjacentNode.distance = sourceDistance + edgeWeight;
          adjacentNode.nodeComeFrom = curr;
          unSettled.add(adjacentNode);
        }
      }
    });
    settled.add(curr);
  }
}

let minDistance = (unsettledNodes) => {
  let lowestDistNode = null;
  let lowestDist = Infinity;

  unsettledNodes.forEach((element) => {
    // console.log(element);
    let dist = element.distance;
    if (dist < lowestDist) {
      lowestDist = dist;
      lowestDistNode = element;
    }
  });
  return lowestDistNode;
};
