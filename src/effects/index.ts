import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects'

export const effects = {
    auth: AuthEffects
}

@NgModule({
    imports: [
        EffectsModule.run(effects.auth)  
    ]
})
export class AppEffectsModule {}