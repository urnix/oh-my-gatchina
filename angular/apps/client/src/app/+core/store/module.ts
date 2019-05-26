import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { LocationsSetCollectionActionEffect } from './actions/locationsListSetCollection.action';
// import { LocationsSetActiveItemIdActionEffect } from './actions/locationsSetActiveItemId.action';
// import { UserAuthenticatedActionEffect } from './actions/userAuthenticated.action';
// import { UserConfigLoadedActionEffect } from './actions/userConfigLoaded.action';
// import { UserProfileLoadedActionEffect } from './actions/userProfileLoaded.action';
import { UserSignedOutActionEffect } from './actions/userSignedOut.action';
// import { UserEmailActionsActionEffect } from './actions/userEmailActions.action';
import { AppMetaReducers, AppReducers, CoreReducer } from './app.reducer';
// import { UserSetPasswordActionEffect } from './actions/userSetPassword.action';
// import { ClearAuthErrorActionEffect } from './actions/clearAuthError.Action';
// import { PermissionsSetCollectionActionEffect } from './actions/permissionsSetCollectionAction.action';
import { FEATURE_NAME } from './feature-name';

@NgModule({
  imports: [
    StoreModule.forRoot(AppReducers, {
      metaReducers: AppMetaReducers
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(FEATURE_NAME, CoreReducer),
    EffectsModule.forFeature([
      // UserAuthenticatedActionEffect,
      // UserConfigLoadedActionEffect,
      // UserProfileLoadedActionEffect,
      // PermissionsSetCollectionActionEffect,
      UserSignedOutActionEffect
      // LocationsSetCollectionActionEffect,
      // LocationsSetActiveItemIdActionEffect,
      // UserEmailActionsActionEffect,
      // UserSetPasswordActionEffect,
      // ClearAuthErrorActionEffect,
    ])
  ]
})
export class CoreStoreModule {}
