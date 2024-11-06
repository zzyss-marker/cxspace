Page({
  data: {
    totalBookings: 0,
    todayBookings: 0,
    pendingBookings: 0,
    venueStats: [
      {
        name: '多媒体教室A101',
        bookings: 120,
        rate: '80%'
      },
      {
        name: '实验室B201',
        bookings: 85,
        rate: '65%'
      }
    ],
    timeStats: [
      { time: '8:00-10:00', count: 25 },
      { time: '10:00-12:00', count: 35 },
      { time: '14:00-16:00', count: 40 },
      { time: '16:00-18:00', count: 30 },
      { time: '19:00-21:00', count: 20 }
    ]
  },

  onLoad() {
    this.loadStatisticsData();
  },

  async loadStatisticsData() {
    try {
      // TODO: 从后端获取统计数据
      // const stats = await getStatistics();
      // this.setData({ ...stats });
    } catch (error) {
      wx.showToast({
        title: '获取统计数据失败',
        icon: 'none'
      });
    }
  },

  onTimeRangeChange(e) {
    const timeRange = e.detail.value;
    // TODO: 根据时间范围更新统计数据
    this.loadStatisticsData(timeRange);
  }
}); 