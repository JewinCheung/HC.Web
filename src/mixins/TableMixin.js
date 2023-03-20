import { filterObj } from '@/utils/util'
import { getAction, deleteAction } from '@/api/manage'

export const TableMixin = {
  data () {
    return {
      /* 表格是否全屏 */
      isFullscreen: false,
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      visibleColumns: [],
      /* 分页参数 */
      pagination: {
        sortBy: '', // 排序字段
        descending: false, // 是否倒序
        page: 1, // 页码
        rowsPerPage: 10, // 单页行数
        rowsNumber: 99// 总行
      },
      pageSizeOptions: [30, 50, 100],
      //   /* 默认排序参数 */
      isorter: {
        column: 'createTime',
        order: ' DESC'
      },
      /* table加载状态 */
      loading: false,
      /* 查询折叠 */
      toggleSearchStatus: false,
      /* 查询栏高度 */
      sHeight: ''

    }
  },
  created () {
    if (!this.disableMixinCreated) {
    //   console.log(' -- mixin created -- ')
      this.loadData()
      // 初始化字典配置 在自己页面定义
      this.initDictConfig()
    }
  },
  computed: {
    /* 自动计算table表格高度 */
    computedStyle () {
      let height = 'auto'

      if (this.toggleSearchStatus) {
        /* 搜索栏展开 获取渲染完成后的高度 */
        this.$nextTick(() => {
          this.sHeight = '- ' + this.$refs.search.offsetHeight + 'px '
        })

        let sub = '- 94px ' // 头部高度
        sub += this.sHeight // 搜索栏高度
        sub += '- 16px ' // page空隙高度上8px+下8px
        sub += '- 40px ' // 列表空隙高度

        height = 'calc(100vh ' + sub + ')'
      } else {
        let sub = '- 94px ' // 头部高度
        sub += '- 52px ' // 搜索栏默认高度
        sub += '- 16px ' // page空隙高度上8px+下8px
        sub += '- 40px ' // 列表空隙高度

        height = 'calc(100vh ' + sub + ')'
      }
      /* 全屏直接拉满 */
      if (this.isFullscreen) {
        height = '100vh'
      }
      return 'height:' + height + ';'
    },
    /* 计算总页数 */
    pagesNumber () {
      return Math.ceil(this.dataSource.length / this.pagination.rowsPerPage)
    }

  },
  methods: {
    /* 加载表格数据 */
    loadData (props) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      // 加载数据 若传入参数则加载对应参数页的内容
      if (props && props.pagination) {
        this.pagination = props.pagination
      }
      var params = this.getQueryParams()// 查询条件
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.response.data
          this.pagination.rowsNumber = res.response.dataCount
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /* 获取查询条件 */
    getQueryParams () {
      var param = Object.assign({}, this.queryParam)
      param.pageIndex = this.pagination.page
      param.pageSize = this.pagination.rowsPerPage
      if (this.pagination.sortBy) {
        param.orderBy = this.pagination.descending ? this.pagination.sortBy + ' DESC' : this.pagination.sortBy
      } else {
        param.orderBy = this.isorter.column + this.isorter.order
      }
      return filterObj(param)
    },
    /* 获取展示的列 */
    getQueryField () {
      // TODO 表格字段权限控制--扩展
      this.columns.forEach(c => {
        this.visibleColumns.push(c.name)
      })
    },
    /* 初始化字典配置 */
    initDictConfig () {
    //   console.log('--这是一个假的方法! 可以被定义页同名函数覆盖')
    },
    /* 表格查询 */
    searchQuery () {
      this.loadData()
    },
    /* 表格重置 */
    searchReset () {
      this.queryParam = {}
      this.loadData()
    },
    /* 查询折叠 */
    handleToggleSearch () {
      this.toggleSearchStatus = !this.toggleSearchStatus
    },
    /* 新增 */
    handleAdd () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    /* 详情--disableSubmit=true 禁用提交按钮 */
    handleDetail (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    },
    /* 编辑 */
    handleEdit (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    /* 删除 */
    handleDelete (id, name) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      this.$message.confirm(`是否确认删除${name}？`).onOk(() => {
        deleteAction(this.url.delete, { id: id }).then(res => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
    /* 新增/修改 成功时，重载列表 */
    modalFormOk () {
      this.loadData()
    }

  }

}
