Page({
  data: {
    studentId: '',
    idCardLast: '',
    isLoading: false,
    errorMsg: ''
  },

  onLoad() {
    // 清除所有存储的登录信息
    wx.clearStorageSync();
    
    // 重置全局数据
    const app = getApp();
    app.globalData.userInfo = null;
    app.globalData.role = '';
    app.globalData.token = '';

    // 检查是否已登录
    const token = wx.getStorageSync('token');
    if (token) {
      this.redirectBasedOnRole();
    }
  },

  // 输入学号
  onStudentIdInput(e) {
    this.setData({
      studentId: e.detail.value,
      errorMsg: ''
    });
  },

  // 输入身份证后几位
  onIdCardInput(e) {
    this.setData({
      idCardLast: e.detail.value,
      errorMsg: ''
    });
  },

  // 登录处理
  async handleLogin() {
    if (!this.validateInput()) {
      return;
    }

    this.setData({ isLoading: true });

    try {
      const mockUserData = await this.mockLogin();
      
      // 先设置全局数据
      getApp().globalData.userInfo = mockUserData.userInfo;
      getApp().globalData.role = mockUserData.userInfo.role;
      getApp().globalData.token = mockUserData.token;

      // 然后存储到本地
      wx.setStorageSync('token', mockUserData.token);
      wx.setStorageSync('userInfo', mockUserData.userInfo);

      // 最后执行跳转
      this.redirectBasedOnRole();

    } catch (error) {
      this.setData({
        errorMsg: error.message || '登录失败，请重试'
      });
    } finally {
      this.setData({ isLoading: false });
    }
  },

  // 根据角色跳转
  redirectBasedOnRole() {
    const role = getApp().globalData.role;
    if (role === 'student') {
      // 使用 reLaunch 而不是 switchTab，确保完全重新加载页面
      wx.reLaunch({
        url: '/pages/student/index/index',
        success: () => {
          // 确保页面跳转成功后再设置 TabBar
          setTimeout(() => {
            if (typeof this.getTabBar === 'function' && this.getTabBar()) {
              this.getTabBar().setData({
                selected: 0
              });
            }
          }, 100);
        }
      });
    } else {
      wx.reLaunch({
        url: '/pages/teacher/index/index'
      });
    }
  },

  // 输入验证
  validateInput() {
    if (!this.data.studentId) {
      this.setData({ errorMsg: '请输入学号' });
      return false;
    }
    if (!this.data.idCardLast) {
      this.setData({ errorMsg: '请输入身份证后几位' });
      return false;
    }
    return true;
  },

  // 模拟登录API
  mockLogin() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.data.studentId === '2020001' && this.data.idCardLast === '1234') {
          resolve({
            token: 'mock_token_student',
            userInfo: {
              id: 1,
              name: '张三',
              studentId: '2020001',
              role: 'student',
              department: '计算机学院'
            }
          });
        } else if (this.data.studentId === '9999999' && this.data.idCardLast === '5678') {
          resolve({
            token: 'mock_token_teacher',
            userInfo: {
              id: 2,
              name: '李老师',
              teacherId: '9999999',
              role: 'teacher',
              department: '计算机学院'
            }
          });
        } else {
          reject(new Error('学号或身份证号错误'));
        }
      }, 1000);
    });
  }
}); 