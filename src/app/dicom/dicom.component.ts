import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable} from 'rxjs';
import { DicomServer } from '../DicomServer';
import { Worklist } from '../worklist';

@Component({
  selector: 'app-dicom',
  templateUrl: './dicom.component.html',
  styleUrls: ['./dicom.component.css']
})
export class DicomComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Worklist>;
  // Inspired from https://stackblitz.com/edit/angular-pagination-mat-table-datasource-dynamic-refresh?file=app%2Ftable-pagination-example.ts
  //dataSource: DicomDataSource;
  dataSource=new MatTableDataSource<Worklist>([]);
  
  data: Worklist[] =[];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  server : DicomServer;
  nomServeur : string;
  port : number; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['patientId', 'patientName', 'patientFirstname', 'patientSex', 'formatBirthDate', 
    'formatDateTime', 'accessionNumber','description','procedureStepLocation', 'physicianName'];

  constructor(private http: HttpClient) {
    this.server = new DicomServer();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
 
  }

  refreshWorklist() : void {
    this.http.post<Worklist[]>("http://localhost:8080/simulator/message/search", this.server).subscribe(
      (data: Worklist[])=> {
        this.dataSource.data = data;
      }
    );
  }

  getWorklist() : Observable<Worklist[]>  {
    return this.http.post<Worklist[]>("http://localhost:8080/simulator/message/search", this.server);
  }
}
