Page({
  data: {
    studentId: '',
    idCard: ''
  },

  onInputStudentId(e) {
    this.setData({
      studentId: e.detail.value
    });
  },

  onInputIdCard(e) {
    this.setData({
      idCard: e.detail.value
    });
  },

  handleLogin() {
    const { studentId, idCard } = this.data;
    
    if (!studentId || !idCard) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 模拟登录验证
    wx.showLoading({
      title: '登录中...',
    });

    // 模拟网络请求延迟
    setTimeout(() => {
      if (studentId === '2020001' && idCard === '1234') {
        // 教师登录
        const userInfo = {
          id: '2020001',
          name: '张老师',
          role: 'teacher'
        };
        this.loginSuccess(userInfo);
      } else if (studentId === '2020002' && idCard === '5678') {
        // 学生登录
        const userInfo = {
          id: '2020002',
          name: '李同学',
          role: 'student'
        };
        this.loginSuccess(userInfo);
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '账号或密码错误',
          icon: 'none'
        });
      }
    }, 1000);
  },

  loginSuccess(userInfo) {
    // 存储用户信息
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('token', 'mock-token-' + userInfo.id); // 模拟token
    
    wx.hideLoading();
    
    // 根据角色跳转到不同页面
    const url = userInfo.role === 'student' 
      ? '/pages/student/index/index'
      : '/pages/teacher/index/index';
      
    wx.reLaunch({
      url: url,
      success: () => {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (error) => {
        console.error('页面跳转失败:', error);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  }
}); 