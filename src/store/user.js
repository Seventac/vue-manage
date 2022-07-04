import Cookie from "js-cookie"

export default {
    state:{
        token:'',
        avatar:''
    },
    mutations:{
        setToken(state,val){
            state.token =val
            Cookie.set('token',val)
        },
        setAvatar(state,val){
            state.avatar=val
            Cookie.set('avatar',val)
            sessionStorage.setItem('avatar',val)
        },
        clearToken(state){
            state.token=''
            Cookie.remove('token')
        },
        clearAvatar(state,val){
            state.avatar=''
            Cookie.remove('avatar',val)
            sessionStorage.clear('avatar')
        },
        getToken(state){
            state.token = state.token || Cookie.get('token')
        },
    }
}
