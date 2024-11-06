Page({
  data: {
    active: 0,
    venueList: [],
    usageRecords: [],
    loading: false
  },

  onLoad() {
    this.loadVenueList();
    this.loadUsageRecords();
  },

  onShow() {
    this.loadVenueList();
    this.loadUsageRecords();
  },

  onTabChange(event) {
    this.setData({ active: event.detail.index });
  },

  loadVenueList() {
    // 模拟加载场地列表
    const mockVenues = [
      {
        id: 1,
        name: '创新实验室A',
        status: 'available',
        capacity: 30,
        equipment: '电脑、投影仪、白板',
        openTime: '8:00-22:00',
        instructions: '请保持环境整洁，离开时关闭所有设备'
      },
      {
        id: 2,
        name: '创新实验室B',
        status: 'maintenance',
        capacity: 20,
        equipment: '3D打印机、工具台',
        openTime: '8:00-22:00',
        instructions: '使用设备前请仔细阅读使用说明'
      }
    ];

    this.setData({ venueList: mockVenues });
  },

  loadUsageRecords() {
    // 模拟加载使用记录
    const mockRecords = [
      {
        id: 1,
        venueName: '创新实验室A',
        date: '2024-03-20',
        userName: '张三',
        userId: '2020003',
        timeSlot: '14:00-16:00',
        purpose: '项目开发',
        status: 'completed'
      },
      {
        id: 2,
        venueName: '创新实验室B',
        date: '2024-03-21',
        userName: '李四',
        userId: '2020004',
        timeSlot: '09:00-11:00',
        purpose: '课程实验',
        status: 'in-use'
      }
    ];

    this.setData({ usageRecords: mockRecords });
  },

  toggleStatus(e) {
    const { id } = e.currentTarget.dataset;
    const venueList = this.data.venueList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'available' ? 'maintenance' : 'available'
        };
      }
      return item;
    });

    this.setData({ venueList });
    wx.showToast({
      title: '状态已更新',
      icon: 'success'
    });
  },

  showUsageRecords(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ active: 1 });
  },

  editVenue(e) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({
      title: '编辑功能开发中',
      icon: 'none'
    });
  },

  addVenue() {
    wx.showToast({
      title: '添加功能开发中',
      icon: 'none'
    });
  }
}); 