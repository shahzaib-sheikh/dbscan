/**
 * @class
 */
export default class DBSCAN<T> {
    private static mergeArrays;
    private dataSet;
    private epsilon;
    private minPts;
    private distanceFunc;
    private clusters;
    private noise;
    private visited;
    private assigned;
    private dataSetLength;
    /**
     *
     * @param dataSet data set that needs to be clustered
     * @param epsilon neighbourhood radius
     * @param minPts minimum points to make a cluster
     * @param distanceFunc distance function
     */
    constructor(dataSet: T[], epsilon: number, minPts: number, distanceFunc: (p: T, q: T) => number);
    getClusteredData(): T[][];
    private run;
    private expandCluster;
    private addToCluster;
    private regionQuery;
}
