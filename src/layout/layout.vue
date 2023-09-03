<template>
    <el-container>
      <!-- 侧边栏 -->
        <el-aside width="200px">
            <el-menu router class="el-menu-vertical-demo" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
                <asideMenu v-for="(menu,index) in menuList" :key="index" :menu="menu"/>
            </el-menu>
        </el-aside>
        <!-- 头部 -->
        <el-container>
          <el-header>
            <div class="left">
              <Breadcrumb/>
            </div>
            <div class="right">
                <el-dropdown @click="doCommand">
                    <span class="el-dropdown-link">{{userName}}</span>
                
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>   
            </el-dropdown>
            </div>
          </el-header>
          <!-- 展示栏 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
import {logout} from '@/apis/user';
import asideMenu from '@/components/asideMenu.vue';

export default {
    components:{
      Breadcrumb,
      asideMenu
    },
    methods: {
      // 退出登录方法
      async doCommand(e){
        if(e === 'logout'){
           // logout 接口 ，成功返回code为20000
           let res = await logout()
           if(res.data.code === 20000){
              // 如果成功则跳转到 login 页面
              await this.$router.replace('/login')
          }
          localStorage,clear()
          window.location.reload()
        }
      },

      logout(){

      }
    },
    computed:{
      userName(){
        return this.$store.state.userName
      },
      menuList(){
        return this.$store.state.menuList
      }
    }
}
</script>

<style scoped>
el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

.left{
    float: left;
}

.right{
    float: right;
}

a:link {
  text-decoration: none;
  color: #fff;

}

/* 状态二: 已经访问过的链接 */
a:visited {
  text-decoration: none;
  color: #fff;
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
  text-decoration: none;
  color: #fff;

}
/* 状态四: 被点击的链接 */
a:active {
  text-decoration: none;
  color: #fff;
}
</style>