import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  file: any;

  constructor(
    private countries: CountryService
  ) {
  }

  ngOnInit() {
  }

  saveAll() {
    this.countries.saveCountries();
  }

  async exportAll() {
    this.saveAll();
    const obj = {};
    await this.countries.getCountries().subscribe(countries => obj['countries'] = countries);

    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_self';
    link.download = 'ipc-tracker-export.json';
    link.click();
  }

  import() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const contents = JSON.parse(fileReader.result);
      console.log(contents);
      this.countries.setCountries(contents.countries);
      this.countries.saveCountries();
    };
    fileReader.readAsText(this.file);
  }
}
