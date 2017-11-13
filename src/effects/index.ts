import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects'
import { SharedModule } from '../app/shared.modules'

export const effects = {
    auth: AuthEffects
}

@NgModule({
    imports: [
        SharedModule,
        EffectsModule.run(effects.auth)  
    ]
})
export class AppEffectsModule {}