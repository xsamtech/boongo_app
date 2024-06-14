/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

const resources = {
    en, fr
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', //To make it work for Android devices.
    resources,
    lng: 'en', // default language to use. On using a language detector, do not define the lng option
    interpolation: {
        escapeValue: false
    }
});

export default i18n;