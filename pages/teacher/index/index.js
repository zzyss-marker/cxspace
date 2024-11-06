Page({
  data: {
    userInfo: {},
    stats: {
      pending: 0,
      today: 0,
      total: 0
    }
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
        pending: 5,
        today: 12,
        total: 156
      }
    });
  },

  navigateTo(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  }
}); 