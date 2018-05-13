import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  constructor(
    private countries: CountryService
  ) {
  }

  ngOnInit() {
  }

  saveAll()
  {
    this.countries.saveCountries();
  }

  async exportAll()
  {
    this.saveAll();
    let obj = {};
    await this.countries.getCountries().subscribe(countries => obj['countries'] = countries);

    let blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_self';
    link.download = 'ipc-tracker-export.json';
    link.click();
  }

}
