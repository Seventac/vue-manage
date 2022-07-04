import Mock from 'mockjs'

export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)
        //先判断用户是否存在
        //判断账号密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index',
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/index'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: '图片上传',
                                    icon: 'setting',
                                    url: 'other/PageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '文本编辑器',
                                    icon: 'setting',
                                    url: 'other/PageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功',
                    handImage:"assets/images/1.jpg"
                },
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index',
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/index'
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功',
                    handImage:"assets/images/2.jpg"
                },

            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                },
            }
        }
    }
}
