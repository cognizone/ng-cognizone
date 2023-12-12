import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Yasgui, YasguiOptions } from '../../models/yasgui';
import { YasguiService } from '../../services/yasgui.service';

@Component({
  selector: 'cz-yasgui',
  templateUrl: 'yasgui.component.html',
  styleUrls: ['./yasgui.component.scss'],
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

  @ViewChild('yasgui', { static: true })
  yasguiRef!: ElementRef;

  @Output()
  queryChange: EventEmitter<string> = new EventEmitter();

  private yasgui!: Yasgui;

  constructor(private yasguiService: YasguiService) {}

  async ngOnInit(): Promise<void> {
    this.yasguiService.loadYasgui().subscribe();
    this.yasgui = await this.createYasgui();
    const yasqe = this.yasgui.current().yasqe;
    yasqe.on('change', () => {
      this.query = yasqe.getValue();
      this.queryChange.emit(this.query);
    });
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
