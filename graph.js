/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let adjacentVertex of vertex.adjacent) {
      adjacentVertex.adjacent.delete(vertex);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = [start.value]) {
    for (let neighbor of start.adjacent) {
      if (!seen.includes(neighbor.value)) {
        seen.push(neighbor.value);
        seen = this.depthFirstSearch(neighbor, seen);
      }
    }
    return seen;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start, seen = [start], values = [start.value], nextLayer = []) {
    // if (!start) return empty
    if (!start && start !== null) return [];
    let nextNextLayer = [];

    //if start is NOT null,
    //loop through start.adjacent, adding each adjacent node that isnt in the seen
    //array to the seen array and add each of those new adjacent nodes's values
    //to the values array, and add all of their adjacsents to the nextLayer
    if (start) {
      for (let adj of start.adjacent) {
        values.push(adj.value);
        seen.push(adj);
        adj.adjacent.forEach(node => nextLayer.push(node));
      }
      return this.breadthFirstSearch(null, seen, values, nextLayer);
    }

    //if start IS null,   <---dont even need this if
    // loop through currentLayer, see if current node is alrready in seen, if not,
    //add its value to the values array, add it to the seen array, and add its
    // adjascents to the next layer array
    //if nextLayer.length === 0 , then return values
    // -----return recursive call start=null, [...seen,...nextLayer], seen, values
    for (let node of nextLayer) {
      if (!seen.includes(node)) {
        values.push(node.value);
        seen.push(node);
        node.adjacent.forEach(el => {
          nextNextLayer.push(el);
        });
      }
    }
    return nextLayer.length ? this.breadthFirstSearch(null, seen, values, nextNextLayer)
      : values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    //[[node,depth], [node,depth]]
    if (start === end) return 0;

    let seen = new Set();
    let toVisitQueue = [[start, 0]];

    while (toVisitQueue.length) {
      let [currVertex, distance] = toVisitQueue.shift();

      if (currVertex === end) return distance;

      for (let adj of currVertex.adjacent) {
        if (!seen.has(adj)) {
          seen.add(adj);
          toVisitQueue.push([adj, distance + 1]);
        }
      }

    }

  }
}

module.exports = { Graph, Node };
