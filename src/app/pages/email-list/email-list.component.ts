import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
displayedColumns = ['to','description','time'];
pageArray = [10,20,50,100]
dataSource = new MatTableDataSource<any>();
  constructor(private matDialog: MatDialog, private emailService: EmailService) { }

  ngOnInit(): void {
    this.getData();
  }

  openEmailPopup(): void {
    const dialogRef=this.matDialog.open(EmailDialogComponent,{
        width: '400px',
        height: 'auto',
      }
    );
    dialogRef.afterClosed().subscribe(response=>{
      this.getData();
    })
  }

  getData() {
    this.emailService.getEmailList().subscribe(response=>{
      this.dataSource.data = response;
    })
  }

}
