Page({
  data: {
    userInfo: null,
    todayApprovals: 0,
    totalVenues: 0,
    monthlyReservations: 0,
    pendingCount: 0
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({ userInfo });
    this.loadDashboardData();
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadDashboardData();
  },

  loadDashboardData() {
    // 获取待审批列表
    const approvalList = wx.getStorageSync('approvalList') || [];
    // 计算待审批数量
    const pendingCount = approvalList.filter(item => item.status === 'pending').length;
    
    this.setData({
      todayApprovals: pendingCount,
      totalVenues: 8, // 这里可以从后端获取实际场地数量
      monthlyReservations: approvalList.length,
      pendingCount: pendingCount
    });
  },

  navigateTo(e) {
    const page = e.currentTarget.dataset.page;
    const routes = {
      approval: '/pages/teacher/approval/approval',
      venue: '/pages/teacher/venue/venue',
      statistics: '/pages/teacher/statistics/statistics'
    };

    wx.switchTab({
      url: routes[page],
      fail: (error) => {
        console.error('页面跳转失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录信息
          wx.clearStorageSync();
          // 跳转到登录页
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
}); 