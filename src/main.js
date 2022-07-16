import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import directives from "@/components/directives";

import '@/assets/_variables.scss'
import '@/assets/UI.scss'


const app = createApp(App);

components.forEach((component) => {
	app.component(component.name, component);
});

directives.forEach((component) => {
	app.directive(component.name, component);
});
app.use(store).use(router).mount("#app");
