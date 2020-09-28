<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-21 23:21:29
 * @LastEditTime: 2020-09-28 00:35:19
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
      <FormItem label="企业名称" prop="enterpriseName">
        <Input v-model="formValidate.enterpriseName" />
      </FormItem>
      <FormItem label="申请人" prop="applicant">
        <Input v-model="formValidate.applicant" />
      </FormItem>

      <FormItem label="手机号" prop="phone">
        <Input v-model="formValidate.phone" />
      </FormItem>

      <FormItem label="地址" prop="address">
        <Input v-model="formValidate.address" />
      </FormItem>
      <FormItem label="详细地址" prop="compQycode">
        <v-distpicker
          :province="formValidate.province"
          :city="formValidate.city"
          :area="formValidate.area"
          @selected="selected"
        ></v-distpicker>
      </FormItem>

      <FormItem label="申请时间" prop="applicationTime">
        <DatePicker
          type="datetime"
          v-model="formValidate.applicationTime"
          placeholder="选择日期时间"
        ></DatePicker>
      </FormItem>

      <FormItem label="到期时间" prop="expireTime">
        <DatePicker
          type="datetime"
          v-model="formValidate.expireTime"
          placeholder="选择日期时间"
        ></DatePicker>
      </FormItem>
      <FormItem label="账号状态:" prop="status">
        <RadioGroup v-model="formValidate.status">
          <Radio label="1">试用中</Radio>
          <Radio label="2">正式</Radio>
          <Radio label="0">停用</Radio>
        </RadioGroup>
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
import VDistpicker from "v-distpicker";
import moment from "moment";
export default {
  name: "patent_list",
  components: { VDistpicker },
  data() {
    return {
      formValidate: {
        enterpriseName: "",
        applicant: "",
        phone: "",
        applicationTime:null,
        expireTime:null,
        status: "1",
        address: "",
        province: "",
        city: "",
        area: "",
        enterpriseId: ""
      },
      ruleValidate: {
        enterpriseName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        applicant: [
          { required: true, message: "申请人不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        applicationTime: [
          { required: true, message: "申请日期不能为空", trigger: "blur", pattern: /.+/ }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
         expireTime: [
          { required: true, message: "过期日期不能为空", trigger: "blur", pattern: /.+/ }
        ],
        status: [
          { required: true, message: "账号状态不能为空", trigger: "blur" }
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
        this.formValidate.enterpriseId = this.$route.query.id;
        this.getData({ id: this.$route.query.id }); //修改
      } else {
        this.formValidate.enterpriseName = "";
        this.formValidate.applicant = "";
        this.formValidate.phone = "";
        this.formValidate.applicationTime =null;
        this.formValidate.expireTime = null;
        this.formValidate.status = "1";
        this.formValidate.address = "";
        this.formValidate.province = "";
        this.formValidate.city = "";
        this.formValidate.area = "";
        this.formValidate.enterpriseId = "";
      }
    },
    getData(params) {
      const that = this;
      getService(`enterprise/getById/${params.id}`, res => {
        this.formValidate.enterpriseName = res.data.enterpriseName;
        this.formValidate.applicant = res.data.applicant;
        this.formValidate.phone = res.data.phone;
        this.formValidate.applicationTime = moment(res.data.applicationTime);
        this.formValidate.expireTime = moment(res.data.expireTime);
        this.formValidate.status = String(res.data.status);
        this.formValidate.address = res.data.address;
        this.formValidate.province = res.data.province;
        this.formValidate.city = res.data.city;
        this.formValidate.area = res.data.area;
        this.formValidate.enterpriseId = res.data.enterpriseId;
      });
    },
    selected(data) {
      this.formValidate.province = data.province.value;
      this.formValidate.city = data.city.value;
      this.formValidate.area = data.area.value;
    },
    handleSubmit(name) {
      const that = this;
      that.$refs[name].validate(valid => {
        console.log(that.formValidate);
        if (valid) {
         if(!that.formValidate.area||!that.formValidate.city||!that.formValidate.province){
             this.$Message.error("请完善省市区");
             return
         }
          that.formValidate.status = Number(that.formValidate.status);
          that.formValidate.applicationTime = moment(
            that.formValidate.applicationTime
          ).format("YYYY-MM-DD HH:mm:ss");
          that.formValidate.expireTime = moment(
            that.formValidate.expireTime
          ).format("YYYY-MM-DD HH:mm:ss");
          !that.$route.query.id
            ? postService("enterprise/add", that.formValidate, res => {
                if (res.code == 200) {
                  that.$router.push({
                    name: "qikan_list"
                  });
                  this.$Message.success(res.desc);
                } else {
                  this.$Message.error(res.message);
                }
              })
            : putService("enterprise/update", that.formValidate, res => {
                if (res.status == 200) {
                  that.$router.push({
                    name: "qikan_list"
                  });
                  this.$Message.success(res.desc);
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
