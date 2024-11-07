Page({
  data: {
    userInfo: {},
    stats: {
      pending: 0,
      approved: 0
    },
    recentBookings: [
      {
        id: 1,
        venueName: '多媒体教室A101',
        date: '2024-03-25',
        startTime: '14:00',
        endTime: '16:00',
        status: 'pending'
      }
    ]
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({ userInfo });
    this.loadStats();
  },

  loadStats() {
    // TODO: 从后端获取统计数据
    this.setData({
      stats: {
        pending: 1,
        approved: 5
      }
    });
  },

  navigateToReservation() {
    wx.navigateTo({
      url: '/pages/student/reservation/reservation'
    });
  },

  navigateToHistory() {
    wx.switchTab({
      url: '/pages/student/history/history'
    });
  }
}); 