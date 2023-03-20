<template>
  <q-page class="q-pa-sm">
    <div class="base-card-shadow q-pa-md" style="background-color: white">
      <q-table
        class="table-sticky-header"
        separator="cell"
        :style="computedStyle"
        virtual-scroll
        square
        flat
        :data="data"
        :columns="columns"
        row-key="id"
        :visible-columns="visibleColumns"
        @request="query"
        :loading="loading"
        hide-bottom
        :rows-per-page-options="[0]"
        :fullscreen.sync="isFullscreen"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top-left>
          <!-- style="background: #1890ff; color: white" -->
          <div>
            <q-btn label="新增" color="primary" icon="add" @click="handleAdd(0)" />
          </div>
        </template>
        <template v-slot:top-right="props">
          <div>
            <q-btn rounded flat dense size="md" icon="autorenew" @click="query">
              <q-tooltip>刷新</q-tooltip>
            </q-btn>
            <q-btn
              rounded
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            >
              <q-tooltip>全屏</q-tooltip>
            </q-btn>
            <q-btn-dropdown
              rounded
              flat
              dense
              size="md"
              auto-close
              outline
              no-icon-animation
              class="btn-dropdown-hide-droparrow"
              icon="apps"
            >
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-toggle
                    v-model="visibleColumns"
                    v-for="item in columns"
                    :key="item.name"
                    :val="item.name"
                    :label="item.label"
                  />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template #body="props">
          <q-tr v-show="props.row.parent.expand">
            <q-td
              key="title"
              :props="props"
              :style="props.row.level>1?'padding-left:'+(props.row.level - 1) * 30 + 'px':''"
            >
              <span :style="props.row.Children?'':'padding-left: 35px'"></span>
              <q-btn
                dense
                round
                flat
                v-if="props.row.Children"
                :icon="props.row.expand ? 'mdi-minus' : 'mdi-plus'"
                @click="toggleExpand(props.row)"
              />
              <span style="padding-left: 5px">{{ props.row.TITLE }}</span>
            </q-td>
            <q-td key="icon" :props="props" :auto-width="true">
              <q-icon :name="props.row.ICON" size="sm" color="t-grey" />
            </q-td>
            <q-td
              key="menuType"
              :props="props"
              style="width:150px"
            >{{props.row.MENU_TYPE|menuMapFilter}}</q-td>
            <q-td key="path" :props="props" class="url-class">
              <div class="text-left" style="white-space: normal;">{{ props.row.PATH }}</div>
            </q-td>
            <q-td key="component" :props="props" class="url-class">{{ props.row.COMPONENT }}</q-td>
            <q-td key="sort" :props="props" :auto-width="true">{{ props.row.SORT }}</q-td>
            <q-td key="isHidden" :props="props" :auto-width="true">
              <q-badge
                outline
                class="q-mx-xs"
                color="primary"
                :label="props.row.IS_HIDDEN?'是':'否'"
              />
            </q-td>
            <q-td key="iskeepAlive" :props="props" :auto-width="true">
              <q-badge
                outline
                class="q-mx-xs"
                color="primary"
                :label="props.row.IS_KEEP_ALIVE?'是':'否'"
              />
            </q-td>
            <q-td key="alwaysShow" :props="props" :auto-width="true">
              <q-badge
                outline
                class="q-mx-xs"
                color="primary"
                :label="props.row.ALWAYS_SHOW?'是':'否'"
              />
            </q-td>
            <q-td key="isOpen" :props="props" :auto-width="true">
              <q-badge outline class="q-mx-xs" color="primary" :label="props.row.IS_OPEN?'是':'否'" />
            </q-td>
            <q-td key="opt" :props="props" :auto-width="true">
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="handleDetail(props.row)"
              >
                <q-tooltip>查看</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="add"
                @click.stop="handleAdd(1,props.row)"
              >
                <q-tooltip>添加下级</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="not_started"
                @click.stop="handleAdd(2,props.row)"
              >
                <q-tooltip>添加按钮权限</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="edit"
                @click.stop="handleEdit(props.row)"
              >
                <q-tooltip>编辑</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="red" icon="delete" @click="handleDelete(props.row)">
                <q-tooltip>删除</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>
  </q-page>
</template>

<script>
// import BaseContent from '@/components/BaseContent/BaseContent'
import PermissionModal from './modules/PermissionModal'
import { getPermissionTree, deletePermission } from '@/api/api'
const menuMap = {
  0: {
    text: '一级菜单'
  },
  1: {
    text: '子菜单'
  },
  2: {
    text: '权限/按钮'
  }
}
export default {
  name: 'PermissionList',
  components: { PermissionModal },
  data () {
    return {
      isFullscreen: false,
      loading: false,
      visibleColumns: [
        'title',
        'icon',
        'menuType',
        'path',
        'component',
        'icon',
        'sort',
        'opt'
      ],
      columns: [
        {
          name: 'title',
          align: 'left',
          label: '菜单名称',
          field: 'TITLE'
        },
        {
          name: 'icon',
          align: 'center',
          label: '图标',
          field: 'ICON'
        },
        {
          name: 'menuType',
          align: 'center',
          label: '菜单类型',
          field: 'MENU_TYPE'
        },
        {
          name: 'path',
          align: 'left',
          label: '访问地址',
          field: 'PATH'
        },
        {
          name: 'component',
          align: 'left',
          label: '组件路径',
          field: 'COMPONENT'
        },
        {
          name: 'sort',
          align: 'center',
          label: '菜单排序',
          field: 'SORT'
        },
        {
          name: 'isHidden',
          align: 'center',
          label: '是否隐藏',
          field: 'IS_HIDDEN'
        },
        {
          name: 'iskeepAlive',
          align: 'center',
          label: '是否缓存',
          field: 'IS_KEEP_ALIVE'
        },
        {
          name: 'alwaysShow',
          align: 'center',
          label: '聚合路由',
          field: 'ALWAYS_SHOW'
        },
        {
          name: 'isOpen',
          align: 'center',
          label: '是否展开',
          field: 'IS_OPEN'
        },

        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'opt'
        }
      ],
      data: [],
      orginMenuList: []
    }
  },
  filters: {
    menuMapFilter (type) {
      return menuMap[type].text
    }
  },
  computed: {
    computedStyle () {
      let height = 'auto'
      if (this.isFullscreen) {
        height = '100vh'
      } else {
        let sub = '- 94px ' // 头部高度
        sub += '- 52px ' // 空隙高度
        height = 'calc(100vh ' + sub + ')'
      }
      return 'height:' + height + ';'
    },
    paddingLeft () {
      const left = (this.data.level - 1) * 40 + 'px'
      return 'padding-left:' + left
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      this.loading = true
      getPermissionTree()
        .then(res => {
          this.orginMenuList = this.data
          this.data = []
          this.initMenuList(res.response, 1, { expand: true, name: res.TITLE })
        })
        .finally(() => {
          this.loading = false
        })
    },
    initMenuList (list, level, parent) {
      list.forEach(m => {
        // 尝试还原下原来的状态
        const orgin = this.orginMenuList.find(o => m.ID === o.ID)
        const expand = orgin && orgin.expand
        this.data.push({
          ...m,
          level,
          expand,
          parent
        })
        if (m.Children && m.Children.length > 0) {
          this.initMenuList(m.Children, level + 1, {
            expand,
            name: m.TITLE
          })
        }
      })
    },
    toggleExpand (menu) {
      // 正常操作，展开只展开本级，收缩则收缩所有下级
      const expand = !menu.expand
      this.data.forEach(m => {
        if (m.ID === menu.ID) {
          m.expand = expand
        }
        // 找到子节点
        if (m.PARENT_ID === menu.ID) {
          m.parent.expand = expand
          if (expand) {
            this.expandAllSon(menu)
          }
          // 折叠的话需要把所有后代后收缩起来
          if (!expand) {
            this.folderAllSon(m)
          }
        }
      })
    },
    expandAllSon (menu) {
      // 展开所有子节点
      if (menu.Children) {
        this.data.forEach(m => {
          if (m.PARENT_ID === menu.ID) {
            // m.parent.expand = true
            m.expand = false
            this.expandAllSon(m)
          }
        })
      }
    },
    folderAllSon (menu) {
      if (menu.Children) {
        this.data.forEach(m => {
          if (m.PARENT_ID === menu.ID) {
            m.parent.expand = false
            m.expand = true
            this.folderAllSon(m)
          }
        })
      }
    },
    handleDetail (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '菜单详情'
      this.$refs.modalForm.disableSubmit = true
    },
    handleAdd (type, record) {
      this.$refs.modalForm.add(type, record)
      this.$refs.modalForm.title = '新增菜单'
      this.$refs.modalForm.disableSubmit = false
      // 重置验证：
      //   this.$refs.myForm.resetValidation()
    },
    handleEdit (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑菜单'
      this.$refs.modalForm.disableSubmit = false
    },
    modalFormOk () {
      this.query()
    },
    handleDelete (record) {
      this.$message.confirm(`是否确认删除${record.TITLE}？`).onOk(() => {
        deletePermission({ id: record.ID }).then(res => {
          if (res.success) {
            this.query()
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus">
.url-class {
  width: 350px;
}
</style>
