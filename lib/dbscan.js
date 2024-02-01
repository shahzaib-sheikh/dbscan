"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 */
class DBSCAN {
    static mergeArrays(a, b) {
        return b.reduce((acc, cr) => {
            if (acc.indexOf(cr) < 0) {
                acc.push(cr);
            }
            return acc;
        }, a);
    }
    /**
     *
     * @param dataSet data set that needs to be clustered
     * @param epsilon neighbourhood radius
     * @param minPts minimum points to make a cluster
     * @param distanceFunc distance function
     */
    constructor(dataSet, epsilon, minPts, distanceFunc) {
        this.epsilon = 1;
        this.minPts = 2;
        this.dataSetLength = 0;
        this.dataSet = dataSet;
        this.clusters = new Array();
        this.noise = new Array();
        this.dataSetLength = dataSet.length;
        this.visited = new Array(this.dataSetLength);
        this.assigned = new Array(this.dataSetLength);
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
    getClusteredData() {
        this.run();
        const data = new Array();
        this.clusters.forEach(cluster => {
            data.push(cluster.map(id => this.dataSet[id]));
        });
        return data;
    }
    run() {
        for (let pointId = 0; pointId < this.dataSetLength; pointId++) {
            if (this.visited[pointId] !== 1) {
                this.visited[pointId] = 1;
                const neighbours = this.regionQuery(pointId);
                if (neighbours.length < this.minPts) {
                    this.noise.push(pointId);
                }
                else {
                    const clusterId = this.clusters.length;
                    this.clusters.push(new Array());
                    this.addToCluster(pointId, clusterId);
                    this.expandCluster(clusterId, neighbours);
                }
            }
        }
        return this.clusters;
    }
    expandCluster(clusterId, neighbours) {
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
    addToCluster(pointId, clusterId) {
        this.clusters[clusterId].push(pointId);
        this.assigned[pointId] = 1;
    }
    regionQuery(id) {
        const neighbours = Array();
        for (let i = 0; i < this.dataSetLength; i++) {
            const dist = this.distanceFunc(this.dataSet[id], this.dataSet[i]);
            if (dist < this.epsilon) {
                neighbours.push(i);
            }
        }
        return neighbours;
    }
}
exports.default = DBSCAN;
