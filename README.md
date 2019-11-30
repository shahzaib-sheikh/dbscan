# dbscan
Density-based spatial clustering of applications with noise (DBSCAN) is one of the most popular algorithm for clustering data. inspired by https://github.com/uhho/density-clustering

# Installation

`npm install db-scan`

# Usage

```
import DBSCAN from 'db-scan';


const dbScan = new DBSCAN<ImageModel>(dataSetArray, neighbourHoodRadius, minPts, (a, b ) => {
  return Math.sqrt(Math.pow(moment(a.createdAt).diff(b.createdAt), 2));
});

dbScan.getClusteredData();
```

# Example Usage

To cluster (group) images taken on short period of time

```
import * as moment from 'moment';
import DBSCAN from 'db-scan';

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

let epsilon = 25 * 60 * 60 * 1000 ; //milliseconds

const dbScan = new DBSCAN<ImageModel>(images,epsilon , 2, (a: ImageModel, b: ImageModel) => {
  return Math.sqrt(Math.pow(moment(a.createdAt).diff(b.createdAt), 2));
});
dbScan.getClusteredData();

/*
returns 
[ 
    [ 
        ImageModel { id: 235, createdAt: 2018-08-24T19:00:00.000Z },
        ImageModel { id: 236, createdAt: 2018-08-25T19:00:00.000Z },
        ImageModel { id: 237, createdAt: 2018-08-26T19:00:00.000Z } 
    ],
    [ 
        ImageModel { id: 240, createdAt: 2018-08-06T19:00:00.000Z },
        ImageModel { id: 241, createdAt: 2018-08-07T19:00:00.000Z } 
    ]
]
*/
```

# License
MIT