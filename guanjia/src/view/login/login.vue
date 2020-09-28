<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-21 23:21:29
 * @LastEditTime: 2020-09-28 22:21:55
 * @LastEditors: yfye
-->
<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
       <!--    <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex';
import { postService } from '../../util/request';
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
 handleSubmit({ userName, password }) {
      const that = this;
      let value = {};
      value.loginName = userName;
      value.loginPass = password;

      postService('login',value,
        (res) => {
          if(res.status==200){
          this.$store.commit('setAvatar', "1111")
          this.$store.commit('setUserName',res.data.loginname)
          this.$store.commit('setUserId', res.data.uid)
          this.$store.commit('setAccess', [])
          this.$store.commit('setHasGetInfo', true);
          this.$store.commit('setToken',res.token);
          localStorage.setItem('setToken',res.token);
          localStorage.setItem('userInfo',res);
           this.$router.push({
                name: this.$config.homeName
              })
          }else{
             this.$Message.error('账号密码不正确')
          }
         
        });
 }
  }
}
</script>

<style>

</style>
