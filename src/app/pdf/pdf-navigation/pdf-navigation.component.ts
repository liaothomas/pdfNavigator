import { Component, OnInit, NgIterable } from '@angular/core';
import { FileModel } from '../../file.model';
import { DocInfo } from '../../docInfo';

@Component({
  selector: 'app-pdf-navigation',
  templateUrl: 'pdf-navigation.component.html',
  styles: []
})
export class PdfNavigationComponent implements OnInit {
  index = [1];
  pageSet = '1';
  page = this.index[0];
  pdfSrc: any = { url: 'src/app/Resources/My First Detail Report.pdf' };
  pdfPages: number;
  itemIdx = 0;
  docId = 1;
  startPageNum: number;
  endPageNum: number;
  totalPages: number;
  displayType = 'single';
  zoomLevel = 1;
  zoomPerCent = 100;
  currentFileName = '183_01NOV2018_233059327.PDF';

  // Hard coded information about the set of files available for processing
  // Eventually will be replace with data from the SCS data store
  files: FileModel[] = [
    { name: 'My First Detail Report.pdf', size: 52, id: 1 },
    { name: '5538_30OCT2018_45210.PDF', size: 10150, id: 2 },
    { name: '8066_31OCT2018_041557481.PDF', size: 18744, id: 3 },
    { name: '19000317_30OCT2018_52435.PDF', size: 94219, id: 4 },
    { name: '20242_30OCT2018_234143125.PDF', size: 146288, id: 5 },
    { name: '183_01NOV2018_233059327.PDF', size: 227629, id: 6 },
    { name: '8066_31OCT2018_041557481.PDF', size: 18744, id: 7 }
  ];

  // Hard coded example information to be displayed with the relevant document page
  docInfo: DocInfo[] = [
    {
      pageInfo: [
        {
          Tags: 'Airframe, Component, FAA',
          Inspector: 'Tom Liao',
          Technician: 'Amosh Shakya',
          Completed: new Date('11/1/2018')
        }
      ]
    },
    {
      pageInfo: [
        ,
        {
          Tags: 'Airframe, Component, FAA',
          Inspector: 'Tom Liao',
          Technician: 'Amosh Shakya',
          Completed: new Date('11/1/2018')
        }
      ]
    },
    {
      pageInfo: [
        ,
        ,
        {
          Tags: 'AirConditioning, Component, CAA',
          Inspector: 'Barney',
          Technician: 'Betty',
          Completed: new Date('10/12/2018')
        }
      ]
    },
    {
      pageInfo: [
        {
          Tags: 'AirConditioning, Component, CAA',
          Inspector: 'Barney',
          Technician: 'Betty',
          Completed: new Date('10/12/2018')
        }
      ]
    },
    ,
    {
      pageInfo: [
        {
          Tags: 'Wheel',
          Inspector: 'Dan',
          Technician: 'Roseanne',
          Completed: new Date('8/12/2017')
        }
      ]
    },
    {
      pageInfo: [
        {
          Tags: 'Rotor, Required',
          Inspector: 'Will',
          Technician: 'Grace',
          Completed: new Date('1/2/2000')
        }
      ]
    }
  ];

  currentDocInfo = this.docInfo[0];

  constructor() {
    // Complete set up of document page information
    this.docInfo[0].pageInfo[2] = {
      Tags: 'Engine, EASA, Replaced',
      Inspector: 'Sowmya Bodapati',
      Technician: 'Debra Durning',
      Completed: new Date('4/20/2000')
    };

    this.docInfo[1].pageInfo[30] = {
      Tags: 'Component, FAA, New',
      Inspector: 'Ted',
      Technician: 'Joe',
      Completed: null
    };

    this.docInfo[1].pageInfo[41] = {
      Tags: 'Component, EASA, New',
      Inspector: 'Fred',
      Technician: 'Joan',
      Completed: new Date('10/25/2018')
    };

    this.docInfo[2].pageInfo[12] = {
      Tags: 'Component, EASA, Something',
      Inspector: 'Fred',
      Technician: 'Wilma',
      Completed: new Date('10/25/2017')
    };

    this.docInfo[2].pageInfo[20] = {
      Tags: 'Door, FAA, Something',
      Inspector: 'Ralph',
      Technician: 'Alice',
      Completed: new Date('10/10/1952')
    };

    this.docInfo[3].pageInfo[201] = {
      Tags: 'Microwave, Cup Holder',
      Inspector: 'Darla',
      Technician: 'Michael',
      Completed: new Date('2/27/1954')
    };

    this.docInfo[3].pageInfo[50] = {
      Tags: 'Navigation, Loran',
      Inspector: 'Cathy',
      Technician: 'Dilbert',
      Completed: new Date('2/27/1954')
    };

    this.docInfo[3].pageInfo[21] = {
      Tags: 'Flaps, Elevator',
      Inspector: 'Michael',
      Technician: 'Jim',
      Completed: new Date('4/30/2012')
    };

    this.docInfo[5].pageInfo[21] = {
      Tags: 'Ailerons, Routine',
      Inspector: 'Boris',
      Technician: 'Barbara',
      Completed: new Date('4/30/1960')
    };

    this.docInfo[5].pageInfo[4] = {
      Tags: 'Stair, Rudder',
      Inspector: 'Vincent',
      Technician: 'Buddy',
      Completed: new Date('5/16/1969')
    };

    this.docInfo[5].pageInfo[4001] = {
      Tags: 'HAL, Inertial Guidance',
      Inspector: 'Peter',
      Technician: 'Chris',
      Completed: new Date('11/24/1959')
    };

    this.docInfo[6].pageInfo[2] = {
      Tags: 'Sprocket, Cog',
      Inspector: 'George',
      Technician: 'Jane',
      Completed: new Date('11/24/1959')
    };

    this.docInfo[6].pageInfo[20] = {
      Tags: 'Electical',
      Inspector: 'Elroy',
      Technician: 'Judy',
      Completed: new Date('11/24/2144')
    };

    this.docInfo[6].pageInfo[31] = {
      Tags: 'Refrideration, Freezer',
      Inspector: 'Fry',
      Technician: 'Lela',
      Completed: new Date('11/24/3000')
    };

    console.log('docInfo(navigator)', this.docInfo);
    console.log('Current doc info', this.currentDocInfo);
  }

  ngOnInit() {}

  onLoadComplete(totalPages: number) {
    console.log(totalPages);
    this.pdfPages = totalPages;
  }

  onPrevious() {
    if (this.itemIdx > 0) {
      this.page = this.index[--this.itemIdx];
    }
  }

  onNext() {
    if (this.itemIdx < this.index.length) {
      this.page = this.index[++this.itemIdx];
    }
  }

  loadFile(fileName: string, docId: number) {
    this.currentFileName = fileName;
    this.docId = docId;
    this.currentDocInfo = this.docInfo[docId - 1];
    console.log('docInfo', this.docInfo);
    console.log('currentDocInfo', this.currentDocInfo);
  }

  // Collect the set of pages that are displayed
  onPagesBlur() {
    const elements = this.pageSet.split(',');

    this.index = [];

    for (let i = 0; i < elements.length; i++) {
      let pageNo = +elements[i];
      if (!pageNo) {
        alert(elements[i] + ' is not a valid Number.');
        break;
      }

      if (pageNo < 1) {
        pageNo = 1;
      }

      if (pageNo > this.pdfPages) {
        pageNo = this.pdfPages;
      }

      this.index.push(pageNo);
    }

    this.itemIdx = 0;
    this.page = this.index[0];
  }

  onScaleChange() {
    this.zoomLevel = this.zoomPerCent * 0.01;
  }

  handleChange(e: string) {
    this.itemIdx = 0;
    this.displayType = e;
  }
}
