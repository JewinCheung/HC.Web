<template>
  <q-dialog flat full-height v-model="showDialog" transition-show="slide-left">
    <q-card
      flat
      square
      class=" fit no-scroll bg-grey-2"
      style="min-width: 1680px"
    >
      <q-card-section
        class="q-pa-none text-white text-subtitle "
        style="background: rgb(21,113,62);"
      >
        <div class="flex justify-between flex-center">
          <q-btn
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-chevron-left"
            class="q-my-auto q-ma-sm"
            v-close-popup
          />
          <div class="q-py-md q-pl-md col">
            <div>
              添加商品
            </div>
          </div>
          <q-btn
            class="q-my-auto q-ma-sm"
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-times"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-px-xs">
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <q-card class="shadow-2">
              <q-card-section>
                <span class="text-bold">
                  {{ orderSale.materialClassId_dictText }}
                </span>

                <q-btn
                  flat
                  size="12px"
                  color="black"
                  icon="dvr"
                  label="显示所有商品"
                  @click="allMaterial"
                />
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <q-scroll-area
                  :thumb-style="thumbStyle"
                  style="height: calc(100vh - 325px);"
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
                              <!-- <b>(0)</b>                        header-class="text-bold"-->
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
                          <div v-for="item in items.children" :key="item.id">
                            <q-item
                              v-if="!item.children"
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
                                <q-item-label>
                                  {{ item.label }}
                                  <!-- <b>(0)</b>                        header-class="text-bold"-->
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-expansion-item
                              v-else
                              v-model="item.expanded"
                              expand-icon="fas fa-caret-down"
                              expanded-icon="fas fa-caret-up"
                              :label="item.label"
                              class="q-pl-sm"
                            >
                              <q-item
                                v-for="its in item.children"
                                :key="its.id"
                                :class="
                                  its.id == active_id
                                    ? 'bg-teal-5 rounded-borders q-my-xs text-white'
                                    : ''
                                "
                                clickable
                                v-ripple
                                style="min-height: 1.5rem;"
                                @click="activeClass(its.id)"
                              >
                                <q-item-section>
                                  <q-item-label class="q-pl-sm">
                                    {{ its.label }}
                                    <!-- <b>(0)</b> -->
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-expansion-item>
                          </div>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <q-card> </q-card>
            <q-card>
              <q-tabs
                v-model="tab"
                align="justify"
                class=""
                active-color="teal-5"
              >
                <q-tab name="mails" label="商品列表" />
                <q-tab name="alarms" label="已选商品" />
              </q-tabs>
              <q-separator />

              <q-tab-panels v-model="tab" animated keep-alive>
                <q-tab-panel name="mails">
                  <div
                    class="q-px-md q-pb-md"
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
                  <div
                    ref="scrollTargetRef"
                    class="scroll"
                    style="height: calc(100vh - 375px);"
                  >
                    <div class="row justify-center" v-if="IsNull">
                      <span class="q-pa-lg">
                        暂无商品！
                      </span>
                    </div>
                    <q-infinite-scroll
                      ref="scrollTarget"
                      @load="onLoadMenu"
                      :offset="200"
                      :scroll-target="$refs.scrollTargetRef"
                    >
                      <div class="row justify-center">
                        <q-intersection
                          v-for="(item, index) in material"
                          :key="index"
                          transition="scale"
                          once
                          class="card-padding  relative-position col-6 col-sm-2 col-md-2 grid-style-transition"
                          :style="
                            item.selected ? 'transform: scale(0.95);' : ''
                          "
                        >
                          <q-card
                            class="q-ma-sm"
                            :class="item.selected ? 'bg-grey-2' : ''"
                          >
                            <q-card-section class="q-py-none q-pa-sm">
                              <q-checkbox
                                dense
                                v-model="item.selected"
                                color="teal"
                                @input="selectedMaterial(item)"
                              />
                            </q-card-section>
                            <q-separator />
                            <div
                              class="full-width row justify-center relative-position q-mt-md"
                            >
                              <!-- :src="
                                item.scalepicPath
                                  ? $global.getImgUrl(item.scalepicPath)
                                  : '/data/bigAlbum.gif'

                              "
                                src="/data/materia_img/1.jpg"-->
                              <q-img
                                :src="
                                  item.scalepicPath
                                    ? $global.getImgUrl(item.scalepicPath)
                                    : '/data/bigAlbum.gif'
                                "
                                style="max-height: 140px; max-width: 100px;"
                                spinner-color="black"
                              />
                            </div>
                            <q-card-section class="text-center">
                              <div class="text-subtitle2 ellipsis ">
                                {{ item.name }}
                              </div>
                              <div class="text-caption text-grey ellipsis">
                                {{ item.materialspec }}
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-intersection>
                      </div>
                      <template v-slot:loading>
                        <div class="text-center q-my-md">
                          <q-spinner-dots color="teal" size="40px" />
                        </div>
                      </template>
                    </q-infinite-scroll>
                  </div>
                </q-tab-panel>

                <q-tab-panel
                  name="alarms"
                  class="scroll"
                  style="height: calc(100vh - 287px);"
                >
                  <div
                    class="row justify-center"
                    v-show="!selectedMaterialList.length > 0"
                  >
                    <span class="q-pa-lg">
                      暂无添加商品！
                    </span>
                  </div>

                  <div class="row justify-center">
                    <div
                      v-for="(item, index) in selectedMaterialList"
                      :key="index"
                      transition="scale"
                      once
                      class="card-padding relative-position col-6 col-sm-2 col-md-2"
                    >
                      <q-card class="q-ma-sm">
                        <q-card-section class="q-py-none q-pa-sm">
                          <q-checkbox
                            dense
                            v-model="item.selected"
                            color="teal"
                            icon="delete"
                            @input="selectedMaterial(item)"
                          />
                        </q-card-section>
                        <q-separator />
                        <div
                          class="full-width row justify-center relative-position q-mt-md"
                        >
                          <q-img
                            :src="
                              item.scalepicPath
                                ? $global.getImgUrl(item.scalepicPath)
                                : '/data/bigAlbum.gif'
                            "
                            style="max-height: 170px; max-width: 100px;"
                            spinner-color="black"
                          />
                        </div>
                        <q-card-section class="text-center">
                          <div class="text-subtitle2 ellipsis">
                            {{ item.name }}
                          </div>
                          <div class="text-caption text-grey ellipsis">
                            {{ item.materialspec }}
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-md bg-grey-2">
        <q-btn
          class="full-width q-py-xs"
          style=""
          label="完成商品添加"
          color="brown"
          @click="submitAdd"
        />
      </q-card-actions>
      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import deepClone from '@/utils/CloneUtils'
import { getMateriallist } from '@/api/api'
export default {
  name: 'SelectMaterialModal',
  data () {
    return {
      loading: false,
      showDialog: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#616161',
        width: '5px',
        opacity: 0.75
      },
      queryParam: { keyWord: '', classCode: '', pageSize: 36 },
      tab: 'mails',
      orderSale: {},
      material_class_left: {},
      active_id: '',
      itemsMenu: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      scrollTarget: 0,
      selected: false,
      IsNull: false,
      material: [],
      selectedMaterialList: [],
      search: '',
      isSearch: false,
      total: 0
    }
  },
  watch: {
    isSearch (n, o) {
      if (n) {
        console.log('进行检索', this.isSearch)
        this.material = []
        this.$refs.scrollTarget.reset()
        this.$refs.scrollTarget.resume()
        this.$refs.scrollTarget.trigger()
      }
    }
  },
  computed: {
    // materialNum () {
    //   return this.material.materialNum
    // }
  },
  methods: {
    show (orderSale) {
      this.material = []
      this.active_id = ''
      this.orderSale = orderSale
      this.showDialog = true
      this.getMaterialClass()
      this.scrollTarget = this.$refs.scrollTargetRef
      this.queryParam.pageSize = 36
      this.queryParam.classCode = orderSale.materialClassCode
      this.selectedMaterialList = []
    },
    setkeyWord (value) {
      this.isSearch = false
      this.queryParam.keyWord = value
      setTimeout(() => {
        this.isSearch = true
      }, 1500)
    },
    getMaterialClass () {
      console.log(this.$store.getters.getMaterialAllClass)
      var materialClassLeft = this.$store.getters.getMaterialAllClass.filter(
        item => {
          return item.code === this.orderSale.materialClassCode
        }
      )
      this.material_class_left = deepClone(materialClassLeft[0])
      console.log(this.material_class_left)
    },
    activeClass (id) {
      this.active_id = id
      this.material = []
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    },
    loadData (index, done) {
      this.IsNull = false
      getMateriallist(this.getQueryParams(index)).then(res => {
        // this.MaterialClass = res.data
        console.log(res.rows)
        var rows = res.rows.length
        // var total = res.total

        this.total = res.total
        res.rows.map(item => {
          item.selected = false
          return item
        })

        if (rows > 0) {
          this.$nextTick(() => {
            this.material.push(...res.rows)
          })
          this.queryParam.pageSize = 24
          console.log(this.material)
          done()
        } else {
          setTimeout(() => {
            if (this.total === 0) {
              this.IsNull = true
            }
            this.$refs.scrollTarget.stop()
          }, 500)
        }
      })
    },
    getQueryParams (index) {
      var param = Object.assign({}, this.queryParam)
      param.classId = this.active_id
      param.pageNum = index
      //   param.pageSize = 24
      param.releaseFlag = 'Y'
      param.column = 'createTime'
      param.order = 'DESC'
      return param
    },
    onLoadMenu (index, done) {
      console.log(index)
      this.loadData(index, done)
      //   console.log(1)
      //   if (index > 1) {
      //     setTimeout(() => {
      //       if (this.itemsMenu) {
      //         this.itemsMenu.push({}, {}, {}, {}, {}, {})
      //         done()
      //       }
      //     }, 500)
      //   } else {
      //     setTimeout(() => {
      //       done()
      //     }, 200)
      //   }
    },
    selectedMaterial (material) {
      console.log(material)
      if (material.selected) {
        this.selectedMaterialList.push(material)
      } else {
        for (const item of this.selectedMaterialList) {
          if (item.id === material.id) {
            const idx = this.selectedMaterialList.indexOf(item)
            if (idx !== -1) {
              this.selectedMaterialList.splice(idx, 1)
            }
          }
        }
      }
      console.log(this.selectedMaterialList)
    },
    hide () {
      this.showDialog = false
    },
    submitAdd () {
      if (this.selectedMaterialList.length > 0) {
        this.$message.success('添加商品成功')

        this.$emit('ok', this.selectedMaterialList)
      } else {
        this.$message.warning('没有选择商品！')
      }
    },
    allMaterial () {
      this.active_id = ''
      this.$nextTick(() => {
        this.material = []
      })
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    }
  }
}
</script>
<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
