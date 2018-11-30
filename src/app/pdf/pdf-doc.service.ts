import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, Observer, observable, of } from 'rxjs';
import { PdfDocResult } from './pdf-doc-result';

@Injectable({
  providedIn: 'root'
})
export class PdfDocService {
  pageSize = 0;
  cached: PdfDocResult[] = [];
  currentDocId: number;
  pageNum: number;
  docId: number;

  constructor(private http: HttpClient) {}

  GetPdfDoc(docId: number, pageNum: number): Observable<PdfDocResult> {
    // If the current cache is not for the requested document, empty the cache
    if (docId !== this.currentDocId) {
      this.cached = [];
      this.currentDocId = docId;
    }

    const startPage = (Math.floor(pageNum / (this.pageSize + 1)) * this.pageSize) + 1;

    if (this.cached[startPage]) {
      return of(this.cached[startPage]);
    } else {
      return Observable.create((obsvr: Observer<PdfDocResult>) => {
        // Eventually need to get URL from configuration
        this.http
          .get(`http://localhost/attachments/Pdf/${docId}/${pageNum}`, {
            responseType: 'arraybuffer',
            observe: 'response'
          })
          .subscribe(
            (resp: any) => {
              const result = new PdfDocResult();
              result.pdfBuffer = resp.body;
              result.startPage = +resp.headers.get('x-start-page-num');
              result.endpage = +resp.headers.get('x-end-page-num');
              result.totalPages = +resp.headers.get('x-total-pages');
              const holdPage: number = +resp.headers.get('x-page-block-size');

              // If the page size has changed, invalidate the cache
              if (this.pageSize !== holdPage) {
                this.cached = [];
                this.pageSize = holdPage;
              }

              // Store the block in the cache and notify the caller
              this.cached[result.startPage] = result;
              obsvr.next(result);
              obsvr.complete();
            },
            error => console.log(error) // Eventually use common logging mechanism
          );
      });
    }
  }
}
