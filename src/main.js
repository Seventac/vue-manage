import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/base.css';
//导入router
import router from "@/router";
//引入store
import store from "@/store"
//引入axios
import http from "axios";
//引入mock
import './api/mock.js'

import {
    Button,
    Radio,
    Container,
    Main,
    Header,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Tooltip,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Card,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Switch,
    DatePicker,
    Dialog,
    Pagination,
    Message,
    MessageBox,
    Upload
} from 'element-ui';

Vue.config.productionTip = false


Vue.use(Radio);
Vue.use(Container);
Vue.use(Button);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tooltip);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Upload);



Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$http = http




new Vue({
    store,
    router,
    render: h => h(App),
    created() {
       store.commit('AddMenu', router)
    }
}).$mount('#app')
