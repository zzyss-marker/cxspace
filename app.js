App({
  globalData: {
    userInfo: null,
    role: '',
    token: ''
  },

  onLaunch() {
    // 检查登录状态
    try {
      const token = wx.getStorageSync('token');
      const userInfo = wx.getStorageSync('userInfo');
      
      if (token && userInfo) {
        this.globalData.token = token;
        this.globalData.userInfo = userInfo;
        this.globalData.role = userInfo.role;
      } else {
        // 未登录状态，清除所有存储
        wx.clearStorageSync();
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
      wx.showToast({
        title: '系统错误',
        icon: 'none'
      });
    }
  }
}); 