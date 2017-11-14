import { NgModule } from '@angular/core';
import { CityPickerProvider } from './city-picker/city-picker';
import { AuthProvider } from './auth/auth';

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
				AuthProvider
			]
		}
	}
}
