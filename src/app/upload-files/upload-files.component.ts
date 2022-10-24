import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles?: FileList;
  message: string[] = [];
  filesUploaded: number = 0;

  fileInfos?: Observable<any>;

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  constructor(private uploadService: UploadFileService) { }

  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
        this.filesUploaded++;
      }
    }
  
  }

  upload(idx: number, file: File): void {
  
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            const msg = `Arquivo ${file.name} importado com sucesso: `;
            this.message.push(msg);
            this.filesUploaded = 0;
            //this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          const msg = 'Não foi possível importar o arquivo: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
        });
    }
  }

}
