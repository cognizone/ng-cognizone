import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AnchorNavComponent } from './components/anchor-nav/anchor-nav.component';
import { ApiTableComponent } from './components/api-table/api-table.component';
import { ArticleTitleComponent } from './components/article-title/article-title.component';
import { ArticleComponent } from './components/article/article.component';
import { BlockquoteComponent } from './components/blockquote/blockquote.component';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { CodeLinkComponent } from './components/code-link/code-link.component';
import { ImgTooltipComponent } from './components/img-tooltip/img-tooltip.component';
import { InlineCodeComponent } from './components/inline-code/inline-code.component';
import { SectionNavComponent } from './components/section-nav/section-nav.component';
import { AnchorDirective } from './directives/anchor.directive';
import { ComponentTooltipDirective, TOOLTIP_COMPONENT, TooltipComponent } from './directives/component-tooltip.directive';
import { ImgTooltipDirective } from './directives/img-tooltip.directive';
import { MatTabRoutedDirective } from './directives/mat-tab-routed.directive';
import { EscapeHtmlPipe } from './pipes/escape-html.pipe';
import { ReadingTimePipe } from './pipes/reading-time.pipe';
import { ExternalDocView } from './views/external-doc/external-doc.view';

const material = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
];

const components = [
  AnchorNavComponent,
  ApiTableComponent,
  ArticleComponent,
  ArticleTitleComponent,
  BlockquoteComponent,
  CodeBlockComponent,
  CodeLinkComponent,
  ExternalDocView,
  ImgTooltipComponent,
  InlineCodeComponent,
  SectionNavComponent,
];
const pipes = [EscapeHtmlPipe, ReadingTimePipe];
const directives = [MatTabRoutedDirective, AnchorDirective, ImgTooltipDirective, ComponentTooltipDirective];

@NgModule({
    declarations: [components, pipes, directives],
    imports: [CommonModule, material, ReactiveFormsModule, RouterModule],
    exports: [material, components, pipes, directives, CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: TOOLTIP_COMPONENT,
            multi: true,
            useValue: {
                class: CodeBlockComponent,
                type: 'code',
            } as TooltipComponent,
        },
    ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModuleRoot> {
    return {
      ngModule: SharedModuleRoot,
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    };
  }
}

@NgModule({
  declarations: [],
  imports: [BrowserAnimationsModule, SharedModule, OverlayModule],
  exports: [BrowserAnimationsModule, SharedModule],
})
export class SharedModuleRoot {}
