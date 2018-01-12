import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects'
import { AttenceEffects } from './attence.effects'
import { TeamEffects } from './team.effects'
import { ContactEffects } from './contact.effects'
import { DailyEffects } from './daily.effects'
import { CreatWorkEffects } from './creatwork.effects'
import { WokrHomeEffects } from './workhome.effects'
import { ChatEffects } from './chat.effects'
import { ProjectEffects } from './project.effects'
import { ApplyEffects } from './apply.effects'
export const effects = {
    auth: AuthEffects,
    attence: AttenceEffects,
    team: TeamEffects,
    contact: ContactEffects,
    daily: DailyEffects,
    creatwork: CreatWorkEffects,
    workhome: WokrHomeEffects,
    chat: ChatEffects,
    project: ProjectEffects,
    apply: ApplyEffects
}

@NgModule({
    imports: [
        EffectsModule.run(effects.auth),
        EffectsModule.run(effects.team),
        EffectsModule.run(effects.attence),
        EffectsModule.run(effects.contact),
        EffectsModule.run(effects.daily),
        EffectsModule.run(effects.creatwork),
        EffectsModule.run(effects.workhome),
        EffectsModule.run(effects.chat),
        EffectsModule.run(effects.project),
        EffectsModule.run(effects.apply)          
    ]
})
export class AppEffectsModule {}