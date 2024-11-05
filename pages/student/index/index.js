Page({
  data: {
    userInfo: {},
    statistics: {
      pendingCount: 0,
      todayCount: 0,
      totalCount: 0
    },
    recentReservations: []
  },

  onLoad() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
    this.loadStatistics();
    this.loadRecentReservations();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
    this.loadStatistics();
    this.loadRecentReservations();
  },

  // 加载统计数据
  loadStatistics() {
    // TODO: 对接后端API
    this.setData({
      statistics: {
        pendingCount: 2,
        todayCount: 1,
        totalCount: 15
      }
    });
  },

  // 加载最近预约记录
  loadRecentReservations() {
    // TODO: 对接后端API
    this.setData({
      recentReservations: [
        {
          id: 1,
          venueName: '创新实验室A',
          date: '2024-03-20',
          timeSlot: '14:00-16:00',
          status: 'pending'
        },
        {
          id: 2,
          venueName: '会议室',
          date: '2024-03-21',
          timeSlot: '09:00-11:00',
          status: 'approved'
        }
      ]
    });
  },

  // 快速预约
  handleQuickReservation() {
    wx.switchTab({
      url: '/pages/student/reservation/reservation'
    });
  },

  // 查看预约详情
  viewReservationDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/student/reservation/detail?id=${id}`
    });
  }
}); 