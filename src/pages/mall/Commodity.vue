<template>
  <div class="main-content">
    <q-scroll-area
      ref="scrollArea"
      :thumb-style="thumbStyle"
      :visible="false"
      style="height: 100%"
    >
      <div
        class="flex flex-center text-center"
        style="padding-left: 18%; padding-right: 18%; background-color: #b5d8cf"
      >
        <h3 style="line-height: 3.125rem">
          欢迎来到订货商城<br />
          Welcome to Ordering mall<br />
        </h3>
      </div>

      <div>
        <div>
          <div
            class="full-width q-pt-md"
            style="background-color: rgb(255, 255, 255)"
          >
            <div class="row q-mx-auto fit well">
              <div class="col-12 col-md-3 q-pl-md">
                <!-- 左侧菜单start -->
                <div class="q-mx-auto full-width full-height">
                  <div class="q-mb-xl" style="position: sticky; top: 50px">
                    <div class="row justify-between align-center text-center">
                      <div
                        class="text-body1 text-bold q-pa-md"
                        style="color: rgb(0, 0, 0)"
                      >
                        {{ material_class_left.label }}
                      </div>
                      <div class="q-ma-auto column justify-center">
                        <!---->
                      </div>
                    </div>
                    <div class="q-px-md">
                      <q-separator class="q-mb-sm" />
                    </div>
                    <!-- 菜单列表start -->
                    <q-scroll-area
                      :thumb-style="thumbStyle"
                      style="height: calc(100vh - 190px);"
                    >
                      <div style="font-family: 'Montserrat', sans-serif;">
                        <div class="q-mb-sm">
                          <div
                            v-for="items in material_class_left.children"
                            :key="items.id"
                          >
                            <q-item
                              v-if="!items.children"
                              :class="
                                items.id == active_id
                                  ? 'bg-teal-5 rounded-borders q-my-xs text-white'
                                  : ''
                              "
                              clickable
                              v-ripple
                              style="min-height: 1.5rem;"
                              @click="activeClass(items.id)"
                            >
                              <q-item-section>
                                <q-item-label>
                                  {{ items.label }}
                                  <!-- <b>(0)</b> -->
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-expansion-item
                              v-else
                              v-model="items.expanded"
                              expand-icon="fas fa-caret-down"
                              expanded-icon="fas fa-caret-up"
                              :label="items.label"
                            >
                              <q-item
                                v-for="item in items.children"
                                :key="item.id"
                                :class="
                                  item.id == active_id
                                    ? 'bg-teal-5 rounded-borders q-my-xs text-white'
                                    : ''
                                "
                                clickable
                                v-ripple
                                style="min-height: 1.5rem;"
                                @click="activeClass(item.id)"
                              >
                                <q-item-section>
                                  <q-item-label class="q-pl-sm">
                                    {{ item.label }}
                                    <!-- <b>(0)</b> -->
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-expansion-item>
                          </div>
                        </div>
                      </div>
                    </q-scroll-area>
                    <!-- 菜单列表end   -->
                  </div>
                  <!-- 左侧菜单end -->
                </div>
              </div>
              <div class="col-xs-12 col-md-9">
                <div class="row flex q-px-md">
                  <!--搜索start-->
                  <div
                    class="row justify-center q-py-sm relative-position col-xs-12 col-sm-8 col-md-12"
                    style="background-color: transparent"
                  >
                    <!---->
                    <div
                      class="well q-px-md"
                      style="min-width: 256px !important; width: 100%"
                    >
                      <!---->
                      <q-input
                        v-model="search"
                        outlined
                        dense
                        color="teal"
                        :placeholder="'共 ' + total + ' 个商品'"
                        clearable
                        clear-icon="fa fa-times"
                        @input="setkeyWord"
                      >
                        <template v-slot:prepend>
                          <q-icon class="text-grey-6" name="fa fa-search" />
                        </template>
                      </q-input>
                    </div>
                    <!---->
                  </div>
                </div>
                <!--搜索end-->
                <div class="q-pa-md relative-position">
                  <div
                    class="flex justify-end q-px-sm q-pr-md q-gutter-sm well"
                  >
                    <q-btn
                      flat
                      size="12px"
                      color="black"
                      icon="dvr"
                      label="显示所有商品"
                      @click="allMaterial"
                    />
                    <q-toggle
                      v-model="collectFlag"
                      color="green"
                      label="显示收藏"
                    />
                  </div>
                  <!-- material 商品列表start -->
                  <q-infinite-scroll
                    ref="scrollTarget"
                    @load="onLoad"
                    :offset="250"
                    class="q-my-sm"
                  >
                    <div class="row justify-center well q-pt-sm q-pb-md">
                      <span class="q-pa-lg" v-if="IsNull">
                        暂无商品！
                      </span>
                      <q-intersection
                        v-for="(item, index) in material"
                        :key="index"
                        transition="scale"
                        class="card-padding relative-position col-6 col-sm-3 col-md-3 q-mb-sm q-pa-sm"
                        once
                        @click="handleMaterial(item)"
                      >
                        <div>
                          <div class="fit flex flex-center">
                            <div
                              class="fit"
                              style="max-width: 200px; font-size: 1rem;"
                            >
                              <q-card
                                class="no-shadow full-height flex text-center  cursor-pointer bg-transparent"
                              >
                                <q-card-section class="q-pa-none full-width">
                                  <div
                                    class="full-width row justify-center relative-position"
                                  >
                                    <q-img
                                      :src="
                                        item.scalepicPath
                                          ? $global.getImgUrl(item.scalepicPath)
                                          : '/data/bigAlbum.gif'
                                      "
                                      style="max-height: 300px;max-width: 200px;"
                                    />
                                  </div>
                                  <div class="flex justify-center flex-center">
                                    <div
                                      class="flex justify-center full-width flex-center"
                                    >
                                      <q-btn
                                        flat
                                        round
                                        class="q-ma-xs"
                                        style="font-size: 10px; color: rgb(176, 64, 64);"
                                        :icon="
                                          item.collectFlag === 'Y'
                                            ? 'fa fa-star'
                                            : 'far fa-star'
                                        "
                                        @click.stop="AddFavorites(item)"
                                      >
                                        <q-tooltip>{{item.collectFlag === 'Y'?'取消收藏':'添加收藏'}}</q-tooltip>
                                      </q-btn>
                                    </div>
                                  </div>
                                  <div
                                    class="self-end full-width flex q-pb-none q-mt-sm q-px-sm"
                                  >
                                    <div
                                      class="q-item__label full-width text-bold text-subtitle2"
                                      style="order: 10;"
                                    >
                                      {{ item.name }}
                                    </div>
                                    <!----><!---->
                                  </div>
                                  <div class="text-caption text-grey">
                                    {{ item.materialspec }}
                                  </div>
                                </q-card-section>
                                <q-card-section
                                  class="q-mb-xs justify-end text-right column full-width"
                                >
                                  <div class="text-caption">
                                    <q-btn
                                      flat
                                      round
                                      size="12px"
                                      color="teal"
                                      class="q-ma-xs"
                                      icon="add_shopping_cart"
                                    >
                                      <q-tooltip>加入订货单</q-tooltip>
                                    </q-btn>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-intersection>
                    </div>
                    <template slot="loading">
                      <div class="row justify-center q-my-md">
                        <q-spinner color="teal" name="dots" size="40px" />
                      </div>
                    </template>
                  </q-infinite-scroll>
                  <!-- 商品列表 end-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row q-pa-md" style="background-color: #113251;height: 120px;">
        <div
          class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center text-white"
        >
          <div class="text-h4 text-weight-bold"></div>
          <div class="text-h6 hover_underline_white q-mt-sm"></div>
          <div class="text-h6 hover_underline_white"></div>
        </div>
        <div
          class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center text-white"
        >
          <div class="text-h4 text-weight-bold"></div>
          <div class="text-h6 hover_underline_white q-mt-sm"></div>
          <div class="text-h6 hover_underline_white"></div>
        </div>
        <div
          class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center text-white"
        >
          <div class="text-h4 text-weight-bold"></div>
          <div class="text-h6 hover_underline_white q-mt-sm"></div>
          <div class="text-h6 hover_underline_white"></div>
        </div>
      </div>
    </q-scroll-area>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="teal"
        icon="arrow_back"
        class="rotate-90"
        @click="sticky"
      />
    </q-page-sticky>
    <MaterialModal
      ref="materialModal"
      @openOrdering="joinOrdering"
    ></MaterialModal>
    <OrderingModal ref="orderingModal" @ok="AddMaterialModalOk"></OrderingModal>
  </div>
</template>

<script>
import MaterialModal from './modules/MaterialModal'
import OrderingModal from './modules/OrderingModal'
import { getMateriallist, setCollect } from '@/api/api'
import deepClone from '@/utils/CloneUtils'
// import Vue from 'vue'
export default {
  name: 'Commodity',
  components: { MaterialModal, OrderingModal },
  data () {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#616161',
        width: '5px',
        opacity: 0.75
      },
      collectFlag: false,
      expanded: true,
      active_id: '',
      active_expansion_id: '',
      search: '',

      stars: 4,
      class_val: 'shadow-1 my-card',
      material_class_left: [
        {
          id: '1001X510000000000GXA',
          label: '小包颗粒尿素',
          children: [
            {
              id: '1001X510000000016M40',
              label: '小包尿素白包',
              number: 4
            },
            {
              id: '1001X510000000016M41',
              label: '小包尿素黄包',
              number: 6
            },
            {
              id: '1001X510000000016M42',
              label: '小包尿素彩包',
              number: 13
            },
            {
              id: '1001X510000000016M44',
              label: '小包尿素自用包',
              number: 24
            },
            {
              id: '1001X51000000005VRUM',
              label: '小包尿素英文包',
              number: 9
            },
            {
              id: '1001X5100000001B0LN2',
              label: '小包外贸尿素',
              number: 2
            }
          ]
        },
        {
          id: '1001X510000000000GXB',
          label: '小包粉末尿素',
          children: [
            {
              id: '1001X510000000016LIC',
              label: '小包粉末尿素白包',
              number: 4
            },
            {
              id: '1001X510000000016LID',
              label: '小包粉末尿素黄包',
              number: 4
            },
            {
              id: '1001X510000000016LIE',
              label: '小包粉末尿素彩包',
              number: 4
            },
            {
              id: '1001X510000000016LIF',
              label: '小包粉末尿素自用包',
              number: 4
            }
          ]
        }
      ],
      material: [],
      material_add: [],
      total: 0,
      IsNull: false,
      queryParam: { keyWord: '' },
      isSearch: false
    }
  },
  computed: {
    getMaterialClass () {
      return this.$store.getters.getMaterialClass
    }
  },
  watch: {
    getMaterialClass (n, o) {
      this.material = []
      console.log('当前分类', n)
      this.getMinClass(n)
    },
    isSearch (n, o) {
      if (n) {
        console.log('进行检索', this.isSearch)
        this.material = []
        this.$refs.scrollTarget.reset()
        this.$refs.scrollTarget.resume()
        this.$refs.scrollTarget.trigger()
      }
    },
    collectFlag (n, o) {
      console.log('收藏显示', n)
      if (n) {
        this.queryParam.collectFlag = 'Y'
      } else {
        this.queryParam.collectFlag = 'N'
        // Vue.delete(this.queryParam, 'collectFlag')
      }
      this.material = []
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    }
  },
  mounted () {
    this.getMinClass(this.$store.getters.getMaterialClass)
  },
  methods: {
    allMaterial () {
      this.active_id = ''
      this.material_class_left = []
      this.material = []
      this.$nextTick(() => {
        this.$refs.scrollArea.setScrollPosition(196, 300)
      })
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    },
    setkeyWord (value) {
      this.isSearch = false
      this.queryParam.keyWord = value
      setTimeout(() => {
        this.isSearch = true
      }, 1500)
    },
    getMinClass (n) {
      var MinClass = ''
      this.material_class_left = deepClone(n)
      if (this.material_class_left.children) {
        if (this.material_class_left.children[0].children) {
          console.log(
            '当前四级分类',
            this.material_class_left.children[0].children[0].label
          )
          MinClass = this.material_class_left.children[0].children[0].id
        } else {
          console.log(
            '当前三级分类',
            this.material_class_left.children[0].label
          )
          MinClass = this.material_class_left.children[0].id
        }
      } else {
        console.log('当前二级分类', this.material_class_left.label)
        MinClass = this.material_class_left.id
      }
      console.log('分类ID', MinClass)
      // this.$refs.scrollTarget.reset()
      // this.$refs.scrollTarget.resume()
      // this.$refs.scrollTarget.trigger()
      this.defaultActiveClass(MinClass)
    },
    // 置顶
    sticky () {
      this.$nextTick(() => {
        this.$refs.scrollArea.setScrollPosition(0, 300)
      })
    },
    // 选择最小类
    defaultActiveClass (id) {
      if (this.material_class_left.level !== 1) {
        this.active_id = id
      }
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
      // this.$store.commit('SET_MESSAGE_MINUS')
    },
    // 选择最小类
    activeClass (id) {
      this.IsNull = false
      this.active_id = id
      this.material = []
      console.log('分类ID', this.active_id)
      // this.$refs.scrollArea.scrollTop = 0
      // console.log('scrollArea', this.$refs.scrollArea)
      this.$nextTick(() => {
        this.$refs.scrollArea.setScrollPosition(196, 300)
      })
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
      console.log(this.$refs.scrollTarget)
      // this.$store.commit('SET_MESSAGE_MINUS')
    },
    // 加载商品
    onLoad (index, done) {
      console.log(index)

      if (index === 1) {
        if (this.material.length > 0) {
          done()
          return
        }
      }
      this.loadData(index, done)
      // if (this.material.length < 50) {
      //   setTimeout(() => {
      //     console.log(this.material)
      //     this.material.push(...this.material_add)
      //     done()
      //   }, 1000)
      // } else {
      //   done()
      // }
    },
    loadData (index, done) {
      this.IsNull = false
      getMateriallist(this.getQueryParams(index)).then(res => {
        // this.MaterialClass = res.data
        console.log(res.rows)
        var rows = res.rows.length
        // var total = res.total

        this.total = res.total

        if (rows > 0) {
          this.material.push(...res.rows)

          console.log('push', this.material)
          done()
        } else {
          setTimeout(() => {
            if (this.total === 0) {
              this.IsNull = true
            }
            this.$refs.scrollTarget.stop()
          }, 200)
        }
      })
    },
    getQueryParams (index) {
      var param = Object.assign({}, this.queryParam)
      param.classId = this.active_id
      param.pageNum = index
      param.pageSize = 40
      param.releaseFlag = 'Y'
      param.column = 'createTime'
      param.order = 'DESC'
      return param
    },
    handleMaterial (item) {
      this.$refs.materialModal.detail(item)
    },
    joinOrdering (material) {
      this.$refs.orderingModal.Ordering(material)
    },
    AddMaterialModalOk () {
      this.$refs.orderingModal.hide()
    },
    AddFavorites (item) {
      console.log(item)
      var collectFlag = item.collectFlag
      if (item.collectFlag !== 'Y') {
        collectFlag = 'Y'
      } else {
        collectFlag = 'N'
      }
      var params = {
        id: item.id,
        collectFlag: collectFlag
      }

      setCollect(params).then(res => {
        if (res.code === 200) {
          this.$nextTick(() => {
            item.collectFlag = collectFlag
          })
          if (collectFlag === 'Y') {
            this.$message.success('收藏成功！')
          } else {
            this.$message.success('取消收藏！')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.box-shadow:hover {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
    0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
}
.my-card {
  width: 100%;
  max-width: 300px;
}

.well {
  max-width: 1400px;
  margin: auto;
}
</style>
