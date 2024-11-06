Page({
  data: {
    venues: [
      {
        id: 1,
        name: '多媒体教室A101',
        capacity: 50,
        equipment: ['投影仪', '音响', '空调'],
        status: 'available',
        bookings: 120,
        description: '配备多媒体教学设备，适合举办讲座和课程'
      },
      {
        id: 2,
        name: '实验室B201',
        capacity: 30,
        equipment: ['显微镜', '实验台', '通风系统'],
        status: 'maintenance',
        bookings: 85,
        description: '专业实验室，配备基础实验设备'
      }
    ]
  },

  handleAddVenue() {
    wx.navigateTo({
      url: '/pages/teacher/venue/add/add'
    });
  },

  handleEditVenue(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/teacher/venue/edit/edit?id=${id}`
    });
  },

  handleStatusChange(e) {
    const { id } = e.currentTarget.dataset;
    wx.showActionSheet({
      itemList: ['正常使用', '维护中', '暂停使用'],
      success: (res) => {
        // TODO: 调用更新状态接口
        wx.showToast({
          title: '状态已更新',
          icon: 'success'
        });
      }
    });
  }
}); 