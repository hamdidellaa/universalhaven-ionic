import { NgModule } from '@angular/core';
import { PriorityPipe } from './priority/priority';
import { DatepipePipe } from './datepipe/datepipe';
@NgModule({
	declarations: [PriorityPipe,
    DatepipePipe],
	imports: [],
	exports: [PriorityPipe,
    DatepipePipe]
})
export class PipesModule {}
