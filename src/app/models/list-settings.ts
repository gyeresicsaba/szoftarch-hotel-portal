export class ListSettings {
  sort: string;
  page: number;
  deleted: boolean;
  complete: boolean;
  billable: boolean;
  qpayer: boolean;
  qstart: string;
  qend: string;
  qnumber: string;
  qid: string;
  analysisUrl: string;

  constructor(analysisUrl: string) {
    this.analysisUrl = analysisUrl;

    const storage = JSON.parse(localStorage.getItem(analysisUrl + '_settings')) || {};
    this.sort = storage.sort;
    this.page = storage.page;
    this.deleted = storage.deleted;
    this.complete = storage.complete;
    this.billable = storage.billable;
    this.qpayer = storage.qpayer;
    this.qstart = storage.qstart;
    this.qend = storage.qend;
    this.qnumber = storage.qnumber;
    this.qid = storage.qid;
  }

  empty() {
    this.sort = null;
    this.page = null;
    this.deleted = null;
    this.complete = null;
    this.billable = null;
    this.qpayer = null;
    this.qstart = null;
    this.qend = null;
    this.qnumber = null;
    this.qid = null;
  }

  save() {
    localStorage.setItem(this.analysisUrl + '_settings', JSON.stringify(this));
  }

  remove() {
    localStorage.removeItem(this.analysisUrl + '_settings');
    this.empty();
  }

  removeOthers() {
    const modules = ['pag', 'milktoxin', 'feedtoxin', 'mastitis', 'tampon'];
    modules.forEach((module) => {
      if (module !== this.analysisUrl) {
        localStorage.removeItem(module + '_settings');
      }
    })
  }
}
