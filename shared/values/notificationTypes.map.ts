export type NotificationTypesSlugType = 'email' | 'sms' | 'push';

export type NotificationTypesItemType = {
  title: string;
  slug: NotificationTypesSlugType;
};

export const NotificationTypes = {
  email: {
    title: 'Email',
    slug: 'email' as NotificationTypesSlugType,
  },
  sms: {
    title: 'SMS',
    slug: 'sms' as NotificationTypesSlugType,
  },
  push: {
    title: 'Push',
    slug: 'push' as NotificationTypesSlugType,
  },
};
export const NotificationTypesArray: NotificationTypesItemType[] = Object.keys(NotificationTypes).map(
  key => NotificationTypes[key],
);
