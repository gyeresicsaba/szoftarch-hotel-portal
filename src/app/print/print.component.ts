import {Component, ElementRef, OnInit} from '@angular/core';
import {PDFJS, PDFW} from 'pdfjs-dist';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  scale = 5;
  pageNumber = 1;
  maxPageNum: number;
  renders = 0;
  isLandscape: boolean;
  private pdf: any;

  constructor(private element: ElementRef, private route: ActivatedRoute) {
  }

  ngOnInit() {
    PDFJS.workerSrc = './assets/pdf.worker.js';

    this.getPdf();
  }

  private getPdf() {
    const pdfSource = <any>{
      url: this.route.snapshot.params['url'],
    };

    PDFJS.getDocument(pdfSource).then((pdf) => {
      this.pdf = pdf;
      this.maxPageNum = this.pdf.numPages;

      this.renders = this.maxPageNum;

      for (let i = 1; i <= this.maxPageNum; i++) {
        this.pageNumber = i;
        this.renderPage();
      }
    });
  }

  private renderPage() {
    this.pdf.getPage(this.pageNumber).then((page) => {

      let viewport = page.getViewport(this.scale);
      this.isLandscape = viewport.height < viewport.width;
      if (this.isLandscape) {
        viewport = page.getViewport(this.scale, 90);
      }

      const canvas = document.createElement('canvas');
      this.element.nativeElement.appendChild(canvas);
      this.element.nativeElement.classes = 'landscape';

      canvas.height = this.isLandscape ? viewport.height - 10 : viewport.height;
      canvas.width = viewport.width;
      canvas.style.display = 'block';
      const context = canvas.getContext('2d');

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      renderTask.then(() => {
        this.renders--;
        if (!this.renders) {
          window.print();
        }
      });
    });
  }

}
