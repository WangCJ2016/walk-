import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects'
import { AttenceEffects } from './attence.effects'
import { TeamEffects } from './team.effects'
import { ContactEffects } from './contact.effects'
import { DailyEffects } from './daily.effects'
export const effects = {
    auth: AuthEffects,
    attence: AttenceEffects,
    team: TeamEffects,
    contact: ContactEffects,
    daily: DailyEffects
}

@NgModule({
    imports: [
        EffectsModule.run(effects.auth),
        EffectsModule.run(effects.team),
        EffectsModule.run(effects.attence),
        EffectsModule.run(effects.contact),
        EffectsModule.run(effects.daily)        
    ]
})
export class AppEffectsModule {}