<template>
  <div>
    <div style="margin-bottom:10px">
      <ButtonGroup>
        <Button type="primary" @click="reflash">刷新</Button>
        <Button type="primary" @click="add" style="float:right">增加</Button>
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
    <Modal v-model="modal3" footer-hide>
      <img :src="imgSrc" style="width:100%" />
    </Modal>
  </div>
</template>
<script>
import { getService, putService, deleteService } from "../../util/request";
export default {
  name: "qikan_list",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      imgSrc: "",
      modal3: false,
      tableTitle: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "员工姓名",
          key: "staffName"
        },
        {
          title: "账号",
          key: "phone"
        },
       
        {
          title: "手机号",
          key: "phone"
        },
       
        {
          title: "账号状态",
          key: "status",
          render(h, params) {
            let text = "";
            if (params.row.status == 0) {
              text = "已停用";
            } else if (params.row.status == 1) {
              text = "已启用";
            }
            return h("div", text);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 320,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.staffId;
            const status = params.row.status;
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "20px"
              //     },
              //     on: {
              //       click: () => {
              //         this.godelete(id);
              //       }
              //     }
              //   },
              //   "删除"
              // ),
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
                  class: {},
                  on: {
                    click: () => {
                      status == 1
                        ? putService(`staff/${id}/${0}`, {
                          id:id,
                          status:0
                        }, res => {
                            if (res.code == 200) {
                              this.$Message.success(res.message);
                              this.getData({
                                pageNo: this.currentPageIdx,
                                pageSize: 10
                              });
                            } else {
                              this.$Message.error(res.message);
                            }
                          })
                        : putService(`staff/${id}/${1}`, { id:id,
                          status:1}, res => {
                            if (res.code == 200) {
                              this.$Message.success(res.message);
                              this.getData({
                                pageNo: this.currentPageIdx,
                                pageSize: 10
                              });
                            } else {
                              this.$Message.error(res.message);
                            }
                          });
                    }
                  }
                },
                status == 1 ? "禁用" : "启用"
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
                      this.$router.push({
                        path: "/search_list/patent_list",
                        query: { id: id }
                      });
                    }
                  }
                },
                "修改"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "20px"
              //     },
              //     on: {
              //       click: () => {
              //         putService(
              //           `enterprise/resetPwd`,
              //           { id: id, pwd: "" },
              //           res => {
              //              this.$Message.success("重置成功");
              //           }
              //         );
              //       }
              //     }
              //   },
              //   "重置密码"
              // )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  watch: {
    $route(to, from) {
      this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    }
  },
  methods: {
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
    add() {
      this.$router.push({
        path: "/search_list/patent_list"
      });
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
      getService(`staff/pageList/${obj.pageNo}/${obj.pageSize}`, res => {
        this.tableData = res.data.items;
        this.total = res.data.counts;
        this.current = res.data.page;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      const that = this;
      deleteService(`enterprise/deleteById/${id}`, res => {
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
