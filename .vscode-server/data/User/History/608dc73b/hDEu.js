import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

export default {
    title: "Vue CRUD Tutorial",
    locales: [{
            name: 'en',
            text: 'English'
        },
        {
            name: 'pl',
            text: 'Polski'
        },
    ],
    defaultLocale: 'en',
    primaryTheme: 'dark',
    secondaryTheme: 'dark',
    theme: {
        primary: '#34495e',
        secondary: '#41b883',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
}