<template>
  <div class="login-box">
    <div class="login-input-box">
    <h1>信贷管理系统</h1>
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
    
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
      </el-form-item>
  
      <el-form-item prop="pass">
        <el-input prefix-icon="el-icon-s-order" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
    </div>
  </div>
</template>

<script>
import {doLogin} from '@/apis/user';
export default {
    name:'LoginView',
    data() {
      return {
        ruleForm:{
          username:'',
          pass:''
        },
        rules: {
          pass: [
          {
            validator: this.validatePass,
            trigger: "blur"
          }
        ],
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }]
      }
      }
    },
    methods: {
      
      validatePass(rule, value, callback) {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (value.length < 6) {
         callback(new Error("密码不能小于6位数"));
       } else {
         callback();
        }
      },
    
      submitForm(){
        this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 如果验证通过，
         //调用login方法，传入登录信息，下面会定义
         this.login(this.ruleForm)
        } else {
         
          return false;
        }
      });
    },

      async login(ruleForm){
        const res = await doLogin(ruleForm)
        if(res.data.code === 20000){
          // 保存token
          if(res?.data?.data?.token){
            localStorage.setItem('token',res?.data?.data?.token)
            await this.$store.dispatch('getMenuList')
            this.$router.replace('/home')
          }
        }else{
          this.$message.error('登录失败')
        }
        
      }
    },
}
</script>

<style lang="scss" scoped>
.login-input-box {
    width: 650px;
    height: 320px;
    background: #fff;
    text-align: center;
    padding: 40px 40px 12px 12px;
    
  }
  
  .login-box {
    height: 100vh;
    background: url(../assets/bg2.jpg);
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .el-button {
    width: 600px;
  }
  
  .el-input {
    width: 600px;
    margin-bottom: 16px;
  }
  
  ::v-deep .el-input__inner {
    background: #e5e5e5;
  }
</style>