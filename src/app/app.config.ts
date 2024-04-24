import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { usersFeature } from './pages/users/lib/+state/users.reducer'

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		importProvidersFrom(HttpClientModule),
		provideAnimationsAsync(),
		provideStore({
			[usersFeature.name]: usersFeature.reducer
		}),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
	]
}
