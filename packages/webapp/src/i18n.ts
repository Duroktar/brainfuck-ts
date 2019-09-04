import i18n from "i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import { i18Options } from './app/i18.options';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18Options);

export default i18n;
