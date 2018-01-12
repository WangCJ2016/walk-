import { NgModule } from '@angular/core';
import { CityPickerProvider } from './city-picker/city-picker';
import { AuthProvider } from './auth/auth';
import { ToastSitutionProvider } from './toast-sitution/toast-sitution'
import { TeamServiceProvider } from './team-service/team-service'
import { ContactServiceProvider } from './contact-service/contact-service'
import { AttenceServiceProvider } from './attence-service/attence-service'
import { DailyServiceProvider } from './daily-service/daily-service'
import { CreatworkServiceProvider} from './creatwork-service/creatwork-service'
import { WorkhomeServiceProvider } from './workhome-service/workhome-service'
import { ChatServiceProvider } from './chat-service/chat-service'
import {ProjectServiceProvider} from './project-service/project-service'
import {ApplyProvider} from './apply/apply'
export {
	CityPickerProvider,
	AuthProvider,
	TeamServiceProvider,
	ToastSitutionProvider,
	ContactServiceProvider,
	AttenceServiceProvider,
	DailyServiceProvider,
	CreatworkServiceProvider,
	WorkhomeServiceProvider,
	ChatServiceProvider,
	ProjectServiceProvider,
	ApplyProvider
}
@NgModule()
export class ProvidersModule {
	static forRoot() {
		return{
			ngModule: ProvidersModule,
			providers: [
				CityPickerProvider,
				AuthProvider,
				ToastSitutionProvider,
				TeamServiceProvider,
				ContactServiceProvider,
				AttenceServiceProvider,
				DailyServiceProvider,
				CreatworkServiceProvider,
				WorkhomeServiceProvider,
				ChatServiceProvider,
				ProjectServiceProvider,
				ApplyProvider
			]
		}
	}
}
