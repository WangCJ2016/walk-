import { NgModule } from '@angular/core';
import { UserMobileDirective } from './user-mobile/user-mobile';
import { UserPasswordDirective } from './user-password/user-password';
@NgModule({
	declarations: [UserMobileDirective,
    UserPasswordDirective],
	imports: [],
	exports: [UserMobileDirective,
    UserPasswordDirective]
})
export class DirectivesModule {}
