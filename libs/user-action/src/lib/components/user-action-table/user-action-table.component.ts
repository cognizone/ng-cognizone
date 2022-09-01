import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { downloadBlob, SelectOptionsProvider } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { of } from 'rxjs';

import { UserAction } from '../../model/user-action';
import { UserActionService } from '../../service/user-action.service';
import { UserActionOptionsService } from '../../service/user-actions-options.service';

@Component({
  selector: 'cz-user-action-table',
  templateUrl: './user-action-table.component.html',
  styleUrls: ['./user-action-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserActionTableComponent extends OnDestroy$ implements OnInit {
  actionNameOptionsProvider!: SelectOptionsProvider<string>;

  userFullNameAttribute!: string;

  userIvAttribute!: string;

  actions: UserAction[] = [];

  pageSize = 10;

  pageIndex = 0;

  totalResults = 0;

  possibleActionNames: string[] = [];

  columns: string[] = ['action', 'date', 'hour', 'user', 'userId', 'status'];

  form: UntypedFormGroup = this.fb.group({
    username: [],
    dateFrom: [],
    dateTo: [],
    actionName: [],
    onlyErrors: [],
  });

  constructor(
    private readonly userActionService: UserActionService,
    private fb: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
    private optionsService: UserActionOptionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userFullNameAttribute = this.optionsService.getOptions().userFullNameAttribute;
    this.userIvAttribute = this.optionsService.getOptions().userIvAttribute;
    this.getUserActions();
    this.form.valueChanges.subscribe(() => {
      this.pageIndex = 0;
      this.getUserActions();
    });
    this.initOptionsProvider();
  }

  setPage(page: PageEvent): void {
    this.pageIndex = page.pageSize === this.pageSize ? page.pageIndex : 0;
    this.pageSize = page.pageSize;
    this.getUserActions();
  }

  downloadAction(action: UserAction): void {
    const s: string = JSON.stringify(action, null, 2);
    downloadBlob(new Blob([s], { type: 'application/json' }), `${action.id}.json`);
  }

  private getUserActions(): void {
    const size = this.pageSize;
    const from = this.pageIndex * this.pageSize;
    const filters = this.form.value;
    this.userActionService.search({ from, size, ...filters }).subscribe(({ actions, total, possibleActionNames }) => {
      this.actions = actions;
      this.totalResults = total;
      this.possibleActionNames = possibleActionNames;
      this.cdr.markForCheck();
    });
  }

  private initOptionsProvider(): void {
    const toSelectOption = (x: string) => ({ value: x, label: x });
    this.actionNameOptionsProvider = {
      hasOptionFor: () => of(true),
      getValueOption: value => of(toSelectOption(value)),
      getOptions: q =>
        of(
          this.possibleActionNames?.map(toSelectOption).filter(option => {
            if (!q) return true;
            return option.value.toLowerCase().includes(q);
          })
        ),
    };
  }
}
