Page({
  data: {
    userInfo: {},
    statistics: {
      pendingCount: 0,
      todayCount: 0,
      totalCount: 0
    },
    pendingReservations: [],
    quickActions: [
      {
        id: 1,
        name: '审批管理',
        icon: 'approval',
        path: '/pages/teacher/approval/approval'
      },
      {
        id: 2,
        name: '场地管理',
        icon: 'venue',
        path: '/pages/teacher/venue/venue'
      },
      {
        id: 3,
        name: '统计分析',
        icon: 'statistics',
        path: '/pages/teacher/statistics/statistics'
      }
    ]
  },

  onLoad() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
    this.loadStatistics();
    this.loadPendingReservations();
  },

  onShow() {
    this.loadStatistics();
    this.loadPendingReservations();
  },

  // 加载统计数据
  loadStatistics() {
    // TODO: 对接后端API
    this.setData({
      statistics: {
        pendingCount: 5,
        todayCount: 8,
        totalCount: 120
      }
    });
  },

  // 加载待审批预约
  loadPendingReservations() {
    // TODO: 对接后端API
    this.setData({
      pendingReservations: [
        {
          id: 1,
          studentName: '张三',
          studentId: '2020001',
          venueName: '创新实验室A',
          date: '2024-03-20',
          timeSlot: '14:00-16:00',
          purpose: '项目开发',
          submitTime: '2024-03-19 10:30'
        },
        {
          id: 2,
          studentName: '李四',
          studentId: '2020002',
          venueName: '会议室',
          date: '2024-03-21',
          timeSlot: '09:00-11:00',
          purpose: '团队会议',
          submitTime: '2024-03-19 11:20'
        }
      ]
    });
  },

  // 快捷操作跳转
  handleQuickAction(e) {
    const { path } = e.currentTarget.dataset;
    wx.navigateTo({ url: path });
  },

  // 处理审批
  handleApproval(e) {
    const { id, action } = e.currentTarget.dataset;
    wx.showLoading({ title: '处理中' });

    // TODO: 对接后端API
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: action === 'approve' ? '已通过' : '已拒绝',
        icon: 'success'
      });
      // 刷新数据
      this.loadStatistics();
      this.loadPendingReservations();
    }, 1000);
  },

  // 查看预约详情
  viewReservationDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/approval/detail?id=${id}`
    });
  }
}); 