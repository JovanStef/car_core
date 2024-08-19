import './assets/main.css'
import './assets/index.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';
import Button from "primevue/button"
import Card from 'primevue/card';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Nora
    }
});
app.component('Button', Button);
app.component('Card', Card);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);


app.use(router)

app.mount('#app')
