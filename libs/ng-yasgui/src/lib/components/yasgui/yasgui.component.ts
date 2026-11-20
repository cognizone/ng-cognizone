import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Yasgui, YasguiOptions } from '../../models/yasgui';
import { YasguiService } from '../../services/yasgui.service';

@Component({
  selector: 'cz-yasgui',
  templateUrl: 'yasgui.component.html',
  styleUrls: ['./yasgui.component.scss'],
  standalone: true,
})
export class YasguiComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  options?: YasguiOptions;

  @Input()
  multiple?: boolean;

  @Input()
  query?: string;

  @Input()
  runQueryOnChange = false;

  @Input()
  hideResultsOnQueryChange: boolean = false;

  @ViewChild('yasgui', { static: true })
  yasguiRef!: ElementRef;

  @Output()
  queryChange: EventEmitter<string> = new EventEmitter();

  private yasgui!: Yasgui;

  private yasguiService = inject(YasguiService);

  async ngOnInit(): Promise<void> {
    this.yasguiService.loadYasgui().subscribe();
    this.yasgui = await this.createYasgui();
    const yasqe = this.yasgui.current().yasqe;
    const yasr = this.yasgui.current().yasr;
    const yasrResultElement = this.yasguiRef.nativeElement.querySelector('.yasr_results') as HTMLElement;
    yasqe.on('change', () => {
      this.query = yasqe.getValue();
      this.queryChange.emit(this.query);
      // Note - when a user clicks on multiple queries one by one, the results are still shown and cannot be emptied,
      // hopefully it is already taken care in the newer versions
      if (this.hideResultsOnQueryChange) {
        yasrResultElement.style.display = 'none';
      }
    });
    // Note - this event is called after the user clicks on the play query button and the results are calculated.
    if (this.hideResultsOnQueryChange) {
      yasr.on('draw', () => {
        yasrResultElement.style.display = 'block';
      });
    }
    this.loadQuery();
  }

  ngOnDestroy(): void {
    this.yasguiService.unloadYasgui();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      this.loadQuery();
      this.queryChange.emit(this.query);
    }
  }

  private loadQuery(): void {
    if (!this.yasgui || this.query == null) {
      return;
    }
    if (this.yasgui.current().yasqe.getValue() !== this.query) {
      this.yasgui.current().yasqe.setValue(this.query);
      if (this.runQueryOnChange && this.options?.yasqe) {
        this.yasgui.current().yasqe.query({
          url: this.options.yasqe.sparql,
          reqMethod: 'POST',
          args: { arg1: this.query },
        });
      }
    }
  }

  private async createYasgui(): Promise<Yasgui> {
    const YASGUI = await firstValueFrom(this.yasguiService.loadYasgui());

    YASGUI.YASQE.defaults.sparql.showQueryButton = true;
    return YASGUI(this.yasguiRef.nativeElement, this.options);
  }
}
