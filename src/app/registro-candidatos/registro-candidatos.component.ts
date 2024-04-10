import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-candidatos',
  templateUrl: './registro-candidatos.component.html',
  styleUrls: ['./registro-candidatos.component.css']
})
export class RegistroCandidatosComponent {
  registroForm: FormGroup;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      selectOption: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      photo: null,
      radioOption: '',
      input11: '',
      input12: '',
      input13: '',
      input14: '',
      input15: '',
      input16: '',
      input17: '',
      input18: ''
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
    }
  }

  onSubmit() {
    // Lógica para enviar el formulario
    console.log(this.registroForm.value);
  }
}