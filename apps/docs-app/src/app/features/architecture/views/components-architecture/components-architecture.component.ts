import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-components-architecture',
  templateUrl: './components-architecture.component.html',
  styleUrls: ['./components-architecture.component.scss'],
})
export class ComponentsArchitectureComponent {
  lastUpdate: Date = new Date('2019-11-25');

  numberControl: UntypedFormControl = new UntypedFormControl(2);

  showIntervalComponent = false;

  catExample = `
  // cats.component.ts
  @Component(/*...*/)
  class CatsComponent {
    cats$: Observable<Cat[]>;
    
    ageMin: number;
    ageMax: number;
    constructor(private catService: CatService) {}

    fetchCats(): void {
      this.cats$ = this.catService.search({age: {min: this.ageMin, max: this.ageMax}});
    }
  }

  // cat.service.ts
  @Injectable({ providedIn: 'root' })
  class CatService {
    private readonly url: string = \`\${environment.api}/cats\`;

    constructor(private http: HttpClient) {}

    search(filter: {age: {min: number, max: number}}): Observable<Cat[]> {
      return this.http.get<Cat[]>(this.url, {params: {'age-min': filter.age.min, 'age-max': filter.age.max}});
    }
  }
  `;
}
