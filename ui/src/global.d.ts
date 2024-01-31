type Messages = (typeof import('./locales/en'))['default']

declare interface IntlMessages extends Messages {}