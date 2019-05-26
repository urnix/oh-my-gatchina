import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.state';
import { FEATURE_NAME } from './feature-name';
import { AuthState } from './types/authState.enum';
// noinspection TypeScriptPreferShortImport
// import { Roles } from '../../../../../../../shared/values/roles.array';
// import { ActivePosition } from '../../protected/+shared/organizationLocationSelector/activePosition.inteface';

export const getCoreState = createFeatureSelector<CoreState>(FEATURE_NAME);
export const getUser = createSelector(
  getCoreState,
  state => state.user
);
export const getUserId = createSelector(
  getCoreState,
  state => state.user && state.user.id
);
export const getAuthState = createSelector(
  getCoreState,
  state => state.authState
);
export const getAuthError = createSelector(
  getCoreState,
  state => state.authError
);
export const getEmailActionCode = createSelector(
  getCoreState,
  state => state.emailActionCode
);
export const getEmailActionEmail = createSelector(
  getCoreState,
  state => state.emailActionEmail
);
export const getResendDate = createSelector(
  getCoreState,
  state => state.resendEmailDate
);

export const getUserCustomFields = createSelector(
  getCoreState,
  state => state.userCustomFields
);
// export const getUserConfig = createSelector(getCoreState, state => state.userConfig);

// export const getActiveOrganizationId = createSelector(
//   getUserConfig,
//   userConfig => (userConfig ? userConfig.activeOrganizationId : null),
// );
// export const getActiveLocationId = createSelector(
//   getUserConfig,
//   userConfig => (userConfig ? userConfig.activeLocationId : null),
// );

// export const getOrganizationItems = createSelector(
//   getCoreState,
//   state => state.organizations && state.organizations.items,
// );
// export const getOrganizationIds = createSelector(getCoreState, state => state.organizations && state.organizations.ids);
// export const getOrganizations = createSelector(
//   getOrganizationItems,
//   getOrganizationIds,
//   (items, ids) => items && ids && ids.map(id => items[id]),
// );

// export const getPermissionItems = createSelector(getCoreState, state => state.permissions && state.permissions.items);
// export const getPermissionIds = createSelector(getCoreState, state => state.permissions && state.permissions.ids);
// export const getPermissions = createSelector(
//   getPermissionItems,
//   getPermissionIds,
//   (items, ids) => items && ids && ids.map(id => items[id]),
// );
//
// export const getActiveOrganizationPermission = createSelector(
//   getPermissions,
//   getActiveOrganizationId,
//   (permissions, organizationId) =>
//     permissions && permissions.find(permission => permission.organizationId === organizationId),
// );
//
// export const getActiveOrganizationRole = createSelector(
//   getActiveOrganizationPermission,
//   permission => (permission && permission.role) || null,
// );
//
// export const getActiveOrganization = createSelector(
//   getActiveOrganizationId,
//   getOrganizationItems,
//   (id, items) => items && id && items[id],
// );

// export const getActiveOrganizationIsXeroActive = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.isXeroActive,
// );
//
// export const getActiveOrganizationIsXeroConnected = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.isXeroConnected,
// );
//
// export const getActiveOrganizationIsXeroTokenRejected = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.isXeroTokenRejected,
// );
//
// export const getActiveOrganizationXeroName = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.xeroOrganizationName,
// );
//
// export const getActiveOrganizationXeroSubscriberEmail = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.xeroSubscriberEmail,
// );
//
// export const getActiveOrganizationTimezone = createSelector(
//   getActiveOrganization,
//   organization => organization && organization.timezone,
// );
//
// export const getIsAdminOrOwner = createSelector(getActiveOrganizationRole, role =>
//   [Roles.admin.slug, Roles.owner.slug].includes(role),
// );
//
// export const getIsOwner = createSelector(getActiveOrganizationRole, role => Roles.owner.slug === role);
//
// export const getActivePosition = createSelector(getUserConfig, userConfig => {
//   let position: ActivePosition;
//   if (userConfig && userConfig.activeLocationId) {
//     position = { type: 'location', id: userConfig.activeLocationId };
//   } else if (userConfig && userConfig.activeOrganizationId) {
//     position = { type: 'organization', id: userConfig.activeOrganizationId };
//   } else {
//     position = { type: null, id: null };
//   }
//   return position;
// });
//
// export const isActivePositionOrganization = createSelector(
//   getActivePosition,
//   position => position.type === 'organization',
// );
//
// export const isActivePositionLocation = createSelector(getActivePosition, position => position.type === 'location');
//
// export const getLocationsState = createSelector(getCoreState, state => state.locations);
//
// export const getLocationsListIds = createSelector(getLocationsState, state => state.ids);
// export const getLocationsListItemsMap = createSelector(getLocationsState, state => state.items);
// export const getLocationsListIsLoading = createSelector(getLocationsState, state => state.isLoading);
// export const getLocationsListLoadError = createSelector(getLocationsState, state => state.loadError);
//
// export const getAllLocations = createSelector(
//   getLocationsListItemsMap,
//   getLocationsListIds,
//   (items, ids) => items && ids && ids.map(id => items[id]),
// );
// export const getLocationsInActiveOrganization = createSelector(
//   getLocationsListItemsMap,
//   getLocationsListIds,
//   getActiveOrganizationId,
//   (items, ids, organizationId) =>
//     items && ids && ids.map(id => items[id]).filter(item => item.organizationId === organizationId),
// );
// export const getLocationsActive = createSelector(
//   getLocationsListItemsMap,
//   getActiveLocationId,
//   (items, activeItemId) => (activeItemId ? items[activeItemId] : null),
// );

export const isNotAuthenticated = createSelector(
  getAuthState,
  authState => authState === AuthState.notAuthenticated
);
export const isAuthorized = createSelector(
  getAuthState,
  authState => authState === AuthState.authorized
);

export function getCurrentLocationURL(): string {
  return document.location.href.split('?')[0];
}

export const isProd = () =>
  window.location.href.includes('foodrazor-eatery.firebaseapp.com') ||
  window.location.href.includes('app.foodrazor.com');
