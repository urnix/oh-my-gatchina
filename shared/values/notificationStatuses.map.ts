export type NotificationStatusSlugType = 'notProcessed' | 'processed' | 'error';

export type NotificationStatusType = {
  title: string;
  slug: NotificationStatusSlugType;
};

export const NotificationStatuses = {
  notProcessed: {
    title: 'Not processed',
    slug: 'notProcessed' as NotificationStatusSlugType,
  },
  processed: {
    title: 'Processed',
    slug: 'processed' as NotificationStatusSlugType,
  },
  error: {
    title: 'Error',
    slug: 'error' as NotificationStatusSlugType,
  },
};
export const NotificationStatusesMap: NotificationStatusType[] = Object.keys(NotificationStatuses).map(
  slug => NotificationStatuses[slug],
);
