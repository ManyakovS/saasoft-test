/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import { createRulesPlugin } from 'vuetify/labs/rules'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(pinia)
    .use(createRulesPlugin({}, vuetify.locale))
}
