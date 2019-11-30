"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const _1 = require("./");
class ImageModel {
    constructor(id, createdAt) {
        this.id = id;
        this.createdAt = createdAt;
    }
}
let idCounter = 234;
const images = [
    new ImageModel(idCounter++, new Date(2018, 7, 23)),
    new ImageModel(idCounter++, new Date(2018, 7, 25)),
    new ImageModel(idCounter++, new Date(2018, 7, 26)),
    new ImageModel(idCounter++, new Date(2018, 7, 27)),
    new ImageModel(idCounter++, new Date(2018, 7, 1)),
    new ImageModel(idCounter++, new Date(2018, 7, 3)),
    new ImageModel(idCounter++, new Date(2018, 7, 7)),
    new ImageModel(idCounter++, new Date(2018, 7, 8)),
];
const dbScan = new _1.default(images, 25 * 60 * 60 * 1000, 2, (a, b) => {
    return Math.sqrt(Math.pow(moment(a.createdAt).diff(b.createdAt), 2));
});
dbScan.getClusteredData();
