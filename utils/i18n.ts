import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'eng',
        debug: true,
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    });

type Languages = 'eng' | 'dutch' | 'french' | 'german';

export const updateTranslations = (content: Record<Languages, { translation: any }>) => {
    const resources: Record<Languages, { translation: any }> = {
        eng: {
            translation: content.eng.translation,
        },
        dutch: {
            translation: content.dutch.translation,
        },
        french: {
            translation: content.french.translation,
        },
        german: {
            translation: content.german.translation,
        },
    };

    Object.keys(resources).forEach(lang => {
        i18n.addResources(lang as Languages, 'translation', resources[lang as Languages].translation);
    });
};

export default i18n;
