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
        // 如果不在登录页，则跳转到登录页
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        if (currentPage && currentPage.route !== 'pages/login/login') {
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
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