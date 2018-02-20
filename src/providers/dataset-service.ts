import { Injectable  } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// context
import { MyApp } from '../app/app.component';


/*
  Generated class for the RecordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatasetService {

  dataset : any;
  datasets: any;
  urlApi: String;

  constructor(public http: Http) {

    this.urlApi = MyApp.appConfig.urlApi;
    // console.log("urlApi : "+ this.urlApi);
  }

  load() {
  // if (this.datasets) {
      // already loaded datasets
  //   return Promise.resolve(this.datasets);
    //}

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
    this.http.get(this.urlApi+'/datasets')
        .map(res => res.json())
        .subscribe(datasets => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference

          // iterate each dataset
          datasets.forEach(dataset => {
            // check if the dataset contains tags
            if (dataset._tags) {
              dataset = this.addInAppPosition(dataset);
            }
          });

          // console.log("BEFORE SORT", datasets);
          datasets = this.sortByPostion(datasets);
          console.log("AFTER SORT", datasets);

          this.datasets = datasets;
          resolve(this.datasets);
        });
    });
  }

  private addInAppPosition(dataset) {
    // retrieve each tag
    var tags = dataset._tags.split(" ");
    tags.forEach(tag => {
      // console.log(tag);

      // check if the tag contains the tag "inAppPosition_"
      var substring = "inAppPosition_";
      var index = dataset._tags.indexOf(substring);
      if (index !== -1) {
        // console.log(index);
      
        // to split --> inAppPosition_10 myOtherTag anotherTag
        // retrieve the rigth side of the splitted string
        var dxSide = dataset._tags.split("_")[1];  // --> 10 myOtherTag anotherTag
        // retrieve the left side of the splitted string
        var datasetPositionString = dxSide.split(" ")[0]; // --> 10
        var datasetPosition = Number(datasetPositionString); // convert to integer
        // console.log("datasetPosition", datasetPosition);

        // add the position to the dataset
        dataset['position'] = datasetPosition;
      }
    });
    return dataset;
  }

  private sortByPostion(datasets) {
    // console.log("sortByPostion.datasets", datasets);

    var toSort = []; // datasets with position
    var unsorted = []; // items without position
    datasets.forEach(dataset => {
      if (dataset.position) {
        // console.log("dataset.position", dataset.position)
        toSort.push(dataset);
      } else {
        // console.log("NO")
        unsorted.push(dataset);
      }
    });

    // sort by position
    var sorted = this.mergeSort(toSort, 'position');
    // console.log("sorted", sorted)

    // concatenates the "sorted" and "unsorted" arrays 
    // adding before the "sorted" elements then the "unsorted" elements
    datasets = sorted.concat(unsorted); 
    // console.log("datasets", datasets);

    return datasets;
  }

  // Split the array into halves and merge them recursively 
  private mergeSort(arr, param) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return this.merge(
      this.mergeSort(left, param),
      this.mergeSort(right, param),
      param
    )
  }

  // compare the arrays item by item and return the concatenated result
  private merge(left, right, param) {
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
      // console.log("left", left[indexLeft][param]);
      // console.log("right", right[indexRight][param]);
      if (left[indexLeft][param] < right[indexRight][param]) {
        result.push(left[indexLeft])
        indexLeft++
      } else {
        result.push(right[indexRight])
        indexRight++
      }
    }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}


loadById(datasetId) {
  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get(this.urlApi + '/datasets')
      .map(res => res.json())
      .subscribe(datasets => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference

        // console.log(datasets);

        for (var dataset in datasets) {
          if (datasets[dataset].id === datasetId ) {
            this.dataset = datasets[dataset];
            break;
          }
        }
        // console.log("dataset", this.dataset);
        resolve(this.dataset);
      });
  });
}
}
