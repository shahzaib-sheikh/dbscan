import * as moment from 'moment';
import DBSCAN from './';

class ImageModel {
  public id: number;
  public createdAt: Date;

  constructor(id: number, createdAt: Date) {
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

const dbScan = new DBSCAN<ImageModel>(images, 25 * 60 * 60 * 1000, 2, (a: ImageModel, b: ImageModel) => {
  return Math.sqrt(Math.pow(moment(a.createdAt).diff(b.createdAt), 2));
});
dbScan.getClusteredData();
