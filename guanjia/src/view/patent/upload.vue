<template>
  <div>
    <div style="margin-bottom:10px">
      <ButtonGroup>
        <Button type="primary" @click="reflash">刷新</Button>
        <Button type="primary" @click="add(1)" style="float:right"
          >增加菜品分类</Button
        >
        <Button type="primary" @click="add(2)" style="float:right"
          >增加套餐分类</Button
        >
      </ButtonGroup>
    </div>
    <Row class="margin-top-10">
      <Table
        :columns="tableTitle"
        :data="tableData"
        border
        ref="selection"
      ></Table>
    </Row>
    <Row class="pageWrapper">
      <Page
        :total="total"
        :current="current"
        show-total
        :page-size="10"
        @on-change="changePage"
      ></Page>
    </Row>
    <Modal v-model="modal" @on-ok="ok" @on-cancel="cancel" :title="title">
      <Form :model="formItem" :label-width="100">
        <FormItem label="分类名称">
          <Input
            v-model="formItem.categoryName"
            placeholder="请填写分类名称..."
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getService, putService, deleteService,postService  } from "../../util/request";
export default {
  name: "qikan_list",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: "",
      type: 1,
      title: "",
      modal: false,
      formItem: {
        categoryName: ""
      },
      tableTitle: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类类型",
          key: "type",
          render(h, params) {
            let text = "";
            if (params.row.type == 1) {
              text = "菜品分类";
            } else if (params.row.type == 2) {
              text = "套餐分类";
            }
            return h("div", text);
          }
        },
        {
          title: "操作时间",
          key: "lastUpdateTime"
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.categoryId;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      this.godelete(id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                      this.title = "修改分类";
                      this.formItem.categoryName=params.row.name;
                      this.id = id;
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    ok() {
      let params = {};
      params["categoryName"] = this.formItem.categoryName;
      if (this.id) {
        params["id"] = this.id;
      } else {
        params["type"] = this.type;
      }

      !this.id
        ? postService("dishCategory/add", params, res => {
            if (res.code == 200) {
              this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
              this.$Message.success(res.message);
              this.modal = false;
            } else {
              this.$Message.error(res.message);
            }
          })
        : putService(`dishCategory/update/${this.id}`, params, res => {
            if (res.code == 200) {
              this.$Message.success(res.message);
              this.modal = false;
              this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
            } else {
              this.$Message.error(res.desc);
            }
          });
    },
    cancel() {
      this.modal = false;
    },

    add(type) {
      this.modal = true;
      this.type = type;
      this.formItem.categoryName="";
      this.id = "";
      if (type == 1) {
        this.title = "新增菜品分类";
      } else {
        this.title = "新增套餐分类";
      }
    },
    reflash() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    getData(obj) {
      getService(`dishCategory/pageList/${obj.pageNo}/${obj.pageSize}`, res => {
        this.tableData = res.data.items;
        this.total = res.data.counts;
        this.current = res.data.page;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      const that = this;
      deleteService(`dishCategory/delete/${id}?id=${id}`, res => {
        if (res.code == 200) {
          that.$Message.success("删除成功");
          that.getData({ pageNo: that.currentPageIdx, pageSize: 10 });
        } else {
          that.$Message.error("删除失败");
          that.getData({ pageNo: that.currentPageIdx, pageSize: 10 });
        }
      });
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
  }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
</style>
