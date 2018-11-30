import { DocInfo } from './../../docInfo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageInfo } from 'src/app/pageInfo';
import { PdfDocService } from '../pdf-doc.service';
import { PdfDocResult } from '../pdf-doc-result';

@Component({
  selector: 'app-view-pdf-page',
  templateUrl: './view-pdf-page.component.html',
  styleUrls: ['./view-pdf-page.component.css']
})
export class ViewPdfPageComponent implements OnInit {
  private _pageNum: number;
  private _docId: number;
  private _zoomPercent: number;
  private _docBlock: PdfDocResult;
  private _currentPageInfo: PageInfo;

  @Input() currentPageInfo: PageInfo;

  // Respond to changes in the page number
  @Input()
  set pageNum(num: number) {
    this._pageNum = num;
    if (num < this.startPage || num > this.endPage) {
      this.loadDocBlock();
    } else {
      this.mappedPageNum = num - this.startPage + 1;
    }
  }

  // Respond to changes in the document ID
  @Input()
  set docId(id: number) {
    this._docId = id;
    this.loadDocBlock();
    }

  // Respond to changes in zoom
  @Input()
  set zoomPercent(pc: number) {
    this._zoomPercent = pc;
    this.zoomLevel = pc / 100;
  }

  // Communitcate relevant information that becomes available after the document is loaded.
  // Right now only providing total number of pages for the document, may make sense to return an event structure
  // just in case additional information it becomes useful to return more in this event.
  @Output() afterLoadComplete: EventEmitter<number> = new EventEmitter<number>();

  pdfSrc: any;
  mappedPageNum: number;
  zoomLevel: number;
  startPage: number;
  endPage: number;

  constructor(private pdfDocServer: PdfDocService) {
    if (!this._zoomPercent) {
      this.zoomPercent = 100;
    }
  }

  ngOnInit() {
  }

  loadDocBlock() {
    if (this._docId && this._pageNum) {
      this.pdfDocServer
      .GetPdfDoc(this._docId, this._pageNum)
      .subscribe((result: PdfDocResult) => {
        this._docBlock = result;
        this.pdfSrc = result.pdfBuffer;
        this.afterLoadComplete.emit(result.totalPages);
        this.startPage = result.startPage;
        this.endPage = result.endpage;

        if (this._pageNum < 1) {
          this._pageNum = 1;
        }

        if (this._pageNum > result.totalPages) {
          this._pageNum = result.totalPages;
        }

        this.mappedPageNum = this._pageNum - this._docBlock.startPage + 1;
      });
    }
  }
}
