Page({
  data: {
    activeTab: 0,
    pendingList: [
      {
        id: 1,
        studentName: '张三',
        studentId: '2021001',
        roomName: '多媒体教室A101',
        date: '2024-03-25',
        startTime: '14:00',
        endTime: '16:00',
        status: 'pending'
      }
    ],
    historyList: [
      {
        id: 2,
        studentName: '李四',
        studentId: '2021002',
        roomName: '实验室B201',
        date: '2024-03-24',
        startTime: '09:00',
        endTime: '11:00',
        status: 'approved'
      }
    ]
  },

  onTabChange(event) {
    this.setData({
      activeTab: event.detail.index
    });
  },

  handleApprove(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认通过',
      content: '确定通过这个预约申请吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用审批通过接口
          wx.showToast({
            title: '已通过',
            icon: 'success'
          });
        }
      }
    });
  },

  handleReject(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认拒绝',
      content: '确定拒绝这个预约申请吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用拒绝接口
          wx.showToast({
            title: '已拒绝',
            icon: 'success'
          });
        }
      }
    });
  }
}); 