<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-21 23:21:29
 * @LastEditTime: 2020-09-28 23:32:50
 * @LastEditors: yfye
-->
<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <img src="../../assets/images/headBg.png" style="width:100%">
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
import { postService } from '../../util/request';
export default {
  components: {
    LoginForm
  },
  methods: {
 handleSubmit({ userName, password,shopId,type }) {
      const that = this;
      let value = {};
      value.phone = userName;
      value.password = password;
      value.shopId = shopId;
      value.type = type;

      postService('login',value,
        (res) => {
          if(res.status==200){
          this.$store.commit('setAvatar', "1111")
          this.$store.commit('setUserName',res.data.loginname)
          this.$store.commit('setUserId', res.data.uid)
          this.$store.commit('setAccess', [])
          this.$store.commit('setHasGetInfo', true);
          this.$store.commit('setToken',res.authorization);
          localStorage.setItem('setToken',res.authorization);
          localStorage.setItem('userInfo',res.data);
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
