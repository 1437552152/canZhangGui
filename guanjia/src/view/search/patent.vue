<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-21 23:21:29
 * @LastEditTime: 2020-09-28 23:06:30
 * @LastEditors: yfye
-->
<template>
  <div class="views-patent-index">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      style="width:700px;margin:0 auto;margin-top:50px;"
    >
      <FormItem label="员工姓名" prop="staffName">
        <Input v-model="formValidate.staffName" />
      </FormItem>

      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" type="password"/>
      </FormItem>

      <FormItem label="手机号" prop="phone">
        <Input v-model="formValidate.phone" />
      </FormItem>
      <FormItem label="性别:" prop="sex">
        <RadioGroup v-model="formValidate.sex">
          <Radio label="男">男</Radio>
          <Radio label="女">女</Radio>
        </RadioGroup>
      </FormItem>
       <FormItem label="身份证号" prop="idNumber">
        <Input v-model="formValidate.idNumber" />
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')"
          >保存</Button
        >
        <Button @click="handleReset('formValidate')" style="margin-left: 8px"
          >重置</Button
        >
        <Button @click="goBack()" style="margin-left: 8px">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {
  getService,
  putService,
  deleteService,
  postService
} from "../../util/request";
import moment from "moment";
export default {
  name: "patent_list",
  data() {
    return {
      formValidate: {
       staffName:'',
       password:'',
       phone:'',
       sex:'男',
       idNumber:'',
       id:''
      },
      newData:{},
      ruleValidate: {
        staffName: [
          { required: true, message: "员工姓名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }],
        idNumber: [
          { required: true, message: "身份证号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.goHandle();
  },
  watch: {
    $route(to, from) {
      this.goHandle();
    }
  },
  methods: {
    goHandle() {
      if (this.$route.query.id) {
        this.formValidate.id = this.$route.query.id;
        this.getData({ id: this.$route.query.id }); //修改
      } else {
        this.formValidate.staffName = "";
        this.formValidate.password = "";
        this.formValidate.phone = "";
        this.formValidate.sex = "男";
        this.formValidate.idNumber = "";
        this.formValidate.id = "";
      }
    },
    getData(params) {
      const that = this;
      getService(`staff/${params.id}?id=${params.id}`, res => {
        this.formValidate.staffName = res.data.staffName;
        this.formValidate.password = res.data.password;
        this.formValidate.phone = res.data.phone;
        this.formValidate.sex = res.data.sex;
        this.formValidate.idNumber = res.data.idNumber;
        this.formValidate.id = res.data.id;

       this.newData=res.data;

      });
    },
    handleSubmit(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        console.log(that.formValidate);
        if (valid) {
          that.formValidate.rePassword=that.formValidate.password;
          if(that.$route.query.id){
             that.formValidate=Object.assign({},this.newData,that.formValidate)
          };
          !that.$route.query.id
            ? postService("staff/add", that.formValidate, res => {
                if (res.code == 200) {
                  that.$router.push({
                    name: "qikan_list"
                  });
                  this.$Message.success(res.message);
                } else {
                  this.$Message.error(res.message);
                }
              })
            : putService("staff/update", that.formValidate, res => {
                if (res.code == 200) {
                  that.$router.push({
                    name: "qikan_list"
                  });
                  this.$Message.success(res.message);
                } else {
                  this.$Message.error(res.desc);
                }
              });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    goBack() {
      this.$router.push({
        name: "qikan_list"
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
