<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-21 23:21:29
 * @LastEditTime: 2020-09-28 23:31:23
 * @LastEditors: yfye
-->
<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
     <FormItem prop="shopId">
      <Input v-model="form.shopId" placeholder="请输入商铺号">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
     <FormItem prop="type" label="账号类型:">
      <RadioGroup v-model="form.type">
          <Radio label="1">集团管理</Radio>
          <Radio label="2">门店管理</Radio>
        </RadioGroup>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    shopIdRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '商铺号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '18810701234',
        password: 'admin',
        shopId:'f3deb',
        type:"1"
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        shopId:this.shopIdRules,
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
             shopId:this.form.shopId,
              type:this.form.type,
          })
        }
      })
    }
  }
}
</script>
