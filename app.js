App({
  globalData: {
    userInfo: null,
    role: '', // 'student' 或 'teacher'
    token: ''
  },

  onLaunch() {
    // 检查登录状态
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    
    if (token && userInfo) {
      // 已登录，设置全局数据
      this.globalData.token = token;
      this.globalData.userInfo = userInfo;
      this.globalData.role = userInfo.role;
    } else {
      // 未登录，清除所有存储并跳转到登录页
      wx.clearStorageSync();
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  }
}); 