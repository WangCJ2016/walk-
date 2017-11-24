import { NgModule } from '@angular/core';
import { CityPickerProvider } from './city-picker/city-picker';
import { AuthProvider } from './auth/auth';
import { ToastSitutionProvider } from './toast-sitution/toast-sitution'

export {
	CityPickerProvider,
	AuthProvider
}
@NgModule()
export class ProvidersModule {
	static forRoot() {
		return{
			ngModule: ProvidersModule,
			providers: [
				CityPickerProvider,
				AuthProvider,
				ToastSitutionProvider
			]
		}
	}
}
