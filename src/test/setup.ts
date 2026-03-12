import '@testing-library/jest-dom';
import '../i18n';
import i18n from '../i18n';

// Force Spanish for tests so existing Spanish-language assertions continue to pass
beforeAll(() => {
  i18n.changeLanguage('es');
});
