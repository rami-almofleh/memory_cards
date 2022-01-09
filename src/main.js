import { createApp } from 'vue'
import { createI18n } from "vue-i18n"
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import "./styles/global.scss"

/**
 * Load locales json files
 * @returns {{}}
 */
function loadLocaleMessages() {
    const locales = require.context(
        "./locales",
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};
    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

/**
 * Create i18n
 */
const i18n = createI18n({
    locale: "en", // set locale
    fallbackLocale: "en", // set fallback locale
    messages: loadLocaleMessages(), // set locale messages
});

createApp(App).use(store).use(i18n).use(router).mount('#app')
