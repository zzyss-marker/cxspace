Page({
  data: {
    historyList: [
      {
        id: 1,
        roomName: '多媒体教室A101',
        date: '2024-03-25',
        startTime: '14:00',
        endTime: '16:00',
        status: 'approved',
        purpose: '项目讨论'
      }
    ]
  },

  onLoad() {
    this.loadHistoryData();
  },

  async loadHistoryData() {
    try {
      // TODO: 从后端获取预约历史数据
      // const historyList = await getBookingHistory();
      // this.setData({ historyList });
    } catch (error) {
      wx.showToast({
        title: '获取历史记录失败',
        icon: 'none'
      });
    }
  }
}); 