import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailListComponent } from '../email-list/email-list.component';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {
  type = '';
  selectedFileType: string[] = [];
  fileTypeSelected = false;
  fileList: File[] = [];
  emailForm: FormGroup;
  fileTypes = [
    {
      name: 'All',
      type: 'all',
      value: '0',
      checked: false,
    },
    {
      name: 'Excel',
      type: '.xls,.xlsx',
      value: '1',
      checked: false,
    },
    {
      name: 'CSV',
      type: '.csv',
      value: '2',
      checked: false,
    },
    {
      name: 'Pdf',
      type: '.pdf',
      value: '3',
      checked: false,
    },
  ];
  constructor(private formBuilder: FormBuilder,private emailService: EmailService, private dialogRef: MatDialogRef<EmailListComponent>,) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void{
this.emailForm = this.formBuilder.group({
  to: ['',[Validators.required]],
  subject:[''],
  cc:[''],
  bcc:[''],
  content:['']
})
  }
  fileChangeEvent(event: any): void {
    this.fileList = event.target.files;
    console.log(this.fileList[0]);
  }

  getChangedFileType(checked: boolean, value: string): void {
    const index = this.fileTypes.findIndex((file) => file.value === value);
    if (checked) {
      this.fileTypeSelected = true;
      this.fileTypes[index].checked = true;
      const uncheckedFlagIndex = this.fileTypes.findIndex(
        (file) => file.checked === false
      );
      if (uncheckedFlagIndex === -1) {
        this.type = '';
      }
      if (value === '0') {
        this.fileTypes.map((file) => {
          file.checked = true;
        });
        this.selectedFileType.push(this.fileTypes[index].type);
      } else {
        this.selectedFileType.push(this.fileTypes[index].type);
      }
      if(this.selectedFileType.length === 3) {
        this.fileTypes[0].checked = true;
        this.selectedFileType = [];
      }
    } else {
      this.fileTypes[index].checked = false;
      const checkedFlagIndex = this.fileTypes.findIndex(
        (file) => file.checked === true
      );
      if (checkedFlagIndex === -1) {
        this.fileTypeSelected = false;
      }
      if (value === '0') {
        this.fileTypeSelected = false;
        this.fileTypes.map((file) => {
          file.checked = false;
        });
        this.selectedFileType = [];
      } else {
        const allIndex = this.fileTypes.findIndex((file) => file.type === 'all');
        if (allIndex !== -1) {
          this.fileTypes[allIndex].checked = false;
          const fileTypeIndex = this.selectedFileType.indexOf(
            this.fileTypes[allIndex].type
          );
          if (fileTypeIndex !== -1) {
            this.selectedFileType.splice(fileTypeIndex, 1);
          }
        }
        const fileTypeIndex = this.selectedFileType.indexOf(
          this.fileTypes[index].type
        );
        if (fileTypeIndex !== -1) {
          this.selectedFileType.splice(fileTypeIndex, 1);
        }
      }
    }
    this.type = this.selectedFileType.join(',');
  }

  submitForm(): void {
    console.log(this.emailForm.valid);
    if(this.emailForm.valid) {
     const formData = new FormData();
     formData.append('to',this.emailForm.value.to);
     formData.append('cc', this.emailForm.value.cc);
     formData.append('bcc',this.emailForm.value.bcc);
     formData.append('subject',this.emailForm.value.subject);
     formData.append('content',this.emailForm.value.content);
     if(this.fileList.length > 0) {
      for(let i = 0; i<this.fileList.length;i++) {
        formData.append('files',this.fileList[i],this.fileList[i].name);
      }
     }
     this.emailService.sendEmail(formData).subscribe(response=>{
       this.dialogRef.close();
     })
    }
  }

  cancelForm(): void {
    this.dialogRef.close();
  }
}
