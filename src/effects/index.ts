import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects'
import { AttenceEffects } from './attence.effects'
export const effects = {
    auth: AuthEffects,
    attence: AttenceEffects
}

@NgModule({
    imports: [
        EffectsModule.run(effects.auth),
        EffectsModule.run(effects.attence)   
    ]
})
export class AppEffectsModule {}