import { Component } from '@angular/core';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPC tracker';

  constructor(
    private countries: CountryService
  ) {
  }

  saveAll()
  {
    this.countries.saveCountries();
  }

  async exportAll()
  {
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
