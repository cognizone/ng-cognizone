import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GraphState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([GraphState])],
})
export class JsonLdStoreModule {}
