/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerTranslation } from 'react-native-paper-dates'

AppRegistry.registerComponent(appName, () => App);
registerTranslation('en', {
    save: 'Save',
    selectSingle: 'Select date',
    selectMultiple: 'Select dates',
    selectRange: 'Select period',
    notAccordingToDateFormat: (inputFormat) => `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later than ${date}`,
    mustBeLowerThan: (date) => `Must be earlier than ${date}`,
    mustBeBetween: (startDate, endDate) => `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
});
registerTranslation('fr', {
    save: 'Enregistrer',
    selectSingle: 'Sélectionner date',
    selectMultiple: 'Sélectionner dates',
    selectRange: 'Sélectionner période',
    notAccordingToDateFormat: (inputFormat) => `Le format de la date doit être ${inputFormat}`,
    mustBeHigherThan: (date) => `Ça doit être avant ${date}`,
    mustBeLowerThan: (date) => `Ça doit être après ${date}`,
    mustBeBetween: (startDate, endDate) => `Ça doit être entre ${startDate} - ${endDate}`,
    dateIsDisabled: 'Le jour n’est pas autorisé',
    previous: 'Précédent',
    next: 'Suivant',
    typeInDate: 'Tapez la date',
    pickDateFromCalendar: 'Choisir la date dans le calendrier',
    close: 'Fermer',
});
