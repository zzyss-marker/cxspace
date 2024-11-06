Page({
  data: {
    active: 0,
    venueStats: [],
    timeSlotStats: [],
    purposeStats: [],
    loading: false
  },

  onLoad() {
    this.loadAllStats();
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadAllStats();
  },

  onTabChange(event) {
    this.setData({ active: event.detail.index });
  },

  loadAllStats() {
    this.setData({ loading: true });
    
    // 模拟加载统计数据
    Promise.all([
      this.loadVenueStats(),
      this.loadTimeSlotStats(),
      this.loadPurposeStats()
    ]).then(() => {
      this.setData({ loading: false });
    });
  },

  loadVenueStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockStats = [
          { name: '创新实验室A', count: 150, percentage: 75 },
          { name: '创新实验室B', count: 120, percentage: 60 },
          { name: '创新实验室C', count: 80, percentage: 40 }
        ];

        this.setData({ venueStats: mockStats });
        resolve();
      }, 500);
    });
  },

  loadTimeSlotStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockStats = [
          { slot: '8:00-10:00', count: 45, percentage: 30 },
          { slot: '10:00-12:00', count: 60, percentage: 40 },
          { slot: '14:00-16:00', count: 75, percentage: 50 },
          { slot: '16:00-18:00', count: 30, percentage: 20 }
        ];

        this.setData({ timeSlotStats: mockStats });
        resolve();
      }, 500);
    });
  },

  loadPurposeStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockStats = [
          { purpose: '项目开发', count: 80, percentage: 40 },
          { purpose: '课程实验', count: 60, percentage: 30 },
          { purpose: '创新比赛', count: 40, percentage: 20 },
          { purpose: '其他用途', count: 20, percentage: 10 }
        ];

        this.setData({ purposeStats: mockStats });
        resolve();
      }, 500);
    });
  }
}); 