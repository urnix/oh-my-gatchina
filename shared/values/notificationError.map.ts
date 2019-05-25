export type NotificationErrorSlugType = 'processingError' | 'thirdPartyError' | 'wasNotDelivered';

export type NotificationErrorType = {
  title: string;
  slug: NotificationErrorSlugType;
};

export const NotificationErrors = {
  notProcessed: {
    title: 'Processing error',
    slug: 'processingError' as NotificationErrorSlugType,
  },
  processed: {
    title: 'Third party error',
    slug: 'thirdPartyError' as NotificationErrorSlugType,
  },
  error: {
    title: 'Was not delivered',
    slug: 'wasNotDelivered' as NotificationErrorSlugType,
  },
};
export const NotificationErrorsArray: NotificationErrorType[] = Object.keys(NotificationErrors).map(
  slug => NotificationErrors[slug],
);
