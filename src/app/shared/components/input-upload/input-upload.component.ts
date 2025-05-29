import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-input-upload',
  imports: [CommonModule, FileUploadModule],
  templateUrl: './input-upload.component.html',
  styleUrl: './input-upload.component.scss',
  standalone: true
})
export class InputUploadComponent {

  @Input() label: string = 'Upload Image';
  @Input() multiple: boolean = false;
  @Input() maxFileSize: number = 1000000;
  @Output() base64Image = new EventEmitter<string>();

  handleSelect(event: any) {
    const file: File = event.files[0];
    if (file) {
      this.convertToBase64(file).then(base64 => {
        this.base64Image.emit(base64);
      });
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

}
