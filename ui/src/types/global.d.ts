type Messages = (typeof import('../i18n/locales/es'))['default']

declare interface IntlMessages extends Messages {}
