Page({
  data: {
    venues: [
      {
        id: 1,
        name: '创新实验室A',
        capacity: '30人',
        equipment: 'PC、投影仪、白板',
        available: true,
        icon: 'computer'
      },
      {
        id: 2,
        name: '创新工作室B',
        capacity: '20人',
        equipment: '3D打印机、工具',
        available: true,
        icon: 'tool'
      },
      {
        id: 3,
        name: '3D打印室',
        capacity: '10人',
        equipment: '3D打印机、扫描仪',
        available: false,
        icon: 'printer'
      },
      {
        id: 4,
        name: '会议室',
        capacity: '15人',
        equipment: '投影仪、白板',
        available: true,
        icon: 'group'
      }
    ],
    selectedVenue: null,
    selectedDate: '',
    selectedTimeSlot: '',
    purpose: '',
    timeSlots: [
      '08:00-10:00',
      '10:00-12:00',
      '14:00-16:00',
      '16:00-18:00',
      '19:00-21:00'
    ],
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30天内
  },

  // 选择场地
  selectVenue(e) {
    const venueId = e.currentTarget.dataset.id;
    const venue = this.data.venues.find(v => v.id === venueId);
    
    if (!venue.available) {
      wx.showToast({
        title: '该场地暂不可预约',
        icon: 'none'
      });
      return;
    }

    this.setData({
      selectedVenue: venue
    });
  },

  // 选择日期
  onDateChange(e) {
    this.setData({
      selectedDate: e.detail.value
    });
    // 根据选择的日期获取可用时间段
    this.getAvailableTimeSlots(e.detail.value);
  },

  // 选择时间段
  onTimeSlotChange(e) {
    this.setData({
      selectedTimeSlot: this.data.timeSlots[e.detail.value]
    });
  },

  // 输入用途说明
  onPurposeInput(e) {
    this.setData({
      purpose: e.detail.value
    });
  },

  // 获取可用时间段
  getAvailableTimeSlots(date) {
    // TODO: 调用后端API获取指定日期的可用时间段
    // 这里暂时返回所有时间段
    return this.data.timeSlots;
  },

  // 提交预约
  async submitReservation() {
    if (!this.validateForm()) {
      return;
    }

    wx.showLoading({
      title: '提交中'
    });

    try {
      // TODO: 调用后端API提交预约
      await this.mockSubmitReservation();
      
      wx.showToast({
        title: '预约提交成功',
        icon: 'success'
      });

      // 延迟跳转到预约记录页
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/student/history/history'
        });
      }, 1500);

    } catch (error) {
      wx.showToast({
        title: error.message || '提交失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  // 表单验证
  validateForm() {
    if (!this.data.selectedVenue) {
      wx.showToast({
        title: '请选择场地',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.selectedDate) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.selectedTimeSlot) {
      wx.showToast({
        title: '请选择时间段',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.purpose.trim()) {
      wx.showToast({
        title: '请填写用途说明',
        icon: 'none'
      });
      return false;
    }
    return true;
  },

  // 模拟提交预约
  mockSubmitReservation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90%成��率
          resolve({
            message: '预约提交成功'
          });
        } else {
          reject(new Error('网络错误，请重试'));
        }
      }, 1000);
    });
  }
}); 