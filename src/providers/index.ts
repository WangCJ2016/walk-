import { NgModule } from '@angular/core';
import { CityPickerProvider } from './city-picker/city-picker';
import { AuthProvider } from './auth/auth';
import { ToastSitutionProvider } from './toast-sitution/toast-sitution'
import { TeamServiceProvider } from './team-service/team-service'
import { ContactServiceProvider } from './contact-service/contact-service'

export {
	CityPickerProvider,
	AuthProvider,
	TeamServiceProvider,
	ToastSitutionProvider,
	ContactServiceProvider
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
				ContactServiceProvider
			]
		}
	}
}
