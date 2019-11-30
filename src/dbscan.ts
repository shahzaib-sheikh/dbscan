/**
 * @class
 */
export default class DBSCAN<T> {
  private static mergeArrays(a: number[], b: number[]): number[] {
    return b.reduce((acc, cr) => {
      if (acc.indexOf(cr) < 0) {
        acc.push(cr);
      }
      return acc;
    }, a);
  }

  private dataSet: T[];
  private epsilon: number = 1;
  private minPts: number = 2;
  private distanceFunc: (p: T, q: T) => number;
  private clusters: number[][];
  private noise: number[];

  private visited: number[];
  private assigned: number[];
  private dataSetLength: number = 0;

  /**
   *
   * @param dataSet data set that needs to be clustered
   * @param epsilon neighbourhood radius
   * @param minPts minimum points to make a cluster
   * @param distanceFunc distance function
   */
  constructor(dataSet: T[], epsilon: number, minPts: number, distanceFunc: (p: T, q: T) => number) {
    this.dataSet = dataSet;
    this.clusters = new Array<number[]>();
    this.noise = new Array<number>();

    this.dataSetLength = dataSet.length;
    this.visited = new Array<number>(this.dataSetLength);
    this.assigned = new Array<number>(this.dataSetLength);

    if (epsilon) {
      this.epsilon = epsilon;
    }

    if (minPts) {
      this.minPts = minPts;
    }

    if (typeof distanceFunc !== 'function') {
      throw new Error('no or invalid distance function provided');
    }

    this.distanceFunc = distanceFunc;
  }
  public getClusteredData(): T[][] {
    this.run();
    const data = new Array<T[]>();
    this.clusters.forEach(cluster => {
      data.push(cluster.map(id => this.dataSet[id]));
    });
    return data;
  }

  private run(): number[][] {
    for (let pointId = 0; pointId < this.dataSetLength; pointId++) {
      if (this.visited[pointId] !== 1) {
        this.visited[pointId] = 1;

        const neighbours = this.regionQuery(pointId);

        if (neighbours.length < this.minPts) {
          this.noise.push(pointId);
        } else {
          const clusterId = this.clusters.length;
          this.clusters.push(new Array<number>());
          this.addToCluster(pointId, clusterId);
          this.expandCluster(clusterId, neighbours);
        }
      }
    }
    return this.clusters;
  }

  private expandCluster(clusterId: number, neighbours: number[]): void {
    for (const pointId of neighbours) {
      if (this.visited[pointId] !== 1) {
        this.visited[pointId] = 1;
        const neighbors2 = this.regionQuery(pointId);

        if (neighbors2.length >= this.minPts) {
          neighbours = DBSCAN.mergeArrays(neighbours, neighbors2);
        }
      }

      if (this.assigned[pointId] !== 1) {
        this.addToCluster(pointId, clusterId);
      }
    }
  }

  private addToCluster(pointId: number, clusterId: number): void {
    this.clusters[clusterId].push(pointId);
    this.assigned[pointId] = 1;
  }

  private regionQuery(id: number): number[] {
    const neighbours = Array<number>();

    for (let i = 0; i < this.dataSetLength; i++) {
      const dist = this.distanceFunc(this.dataSet[id], this.dataSet[i]);
      if (dist < this.epsilon) {
        neighbours.push(i);
      }
    }

    return neighbours;
  }
}
