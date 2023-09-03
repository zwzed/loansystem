import request from '@/utils/request';

export const doLogin = (user) => {
    console.log(user.username, user.pass);
    return request.post('/user/login', {
        // 后端需要account字符，即用户名
        account: user.username,
        password: user.pass
    })
}

export const logout = () => {
    return request.post('/user/logout')
}

// 创建用户接口
export const createUser = ({ username, password, permission }) => {
    return request.post('/permission/createUser', {
        account: username,
        password,
        role_id: permission
    })
}

// 获取用户列表接口
export const userList = () => {
    return request({
        url: '/user/list?type=new',
        method: 'get'
    })
}

// 获取用户角色
export const userInfo = () => {
    return request.get('/user/info')
}