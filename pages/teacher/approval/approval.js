Page({
  data: {
    approvalList: [],
    loading: false
  },

  onLoad() {
    this.loadApprovalList();
  },

  onPullDownRefresh() {
    this.loadApprovalList();
  },

  loadApprovalList() {
    this.setData({ loading: true });
    
    // 模拟获取审批列表数据
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          studentName: '张三',
          studentId: '2020003',
          venueName: '创新实验室A',
          date: '2024-03-20',
          timeSlot: '14:00-16:00',
          status: 'pending',
          purpose: '项目开发'
        },
        {
          id: 2,
          studentName: '李四',
          studentId: '2020004',
          venueName: '创新实验室B',
          date: '2024-03-21',
          timeSlot: '09:00-11:00',
          status: 'pending',
          purpose: '课程实验'
        }
      ];

      this.setData({
        approvalList: mockData,
        loading: false
      });

      wx.stopPullDownRefresh();
    }, 1000);
  },

  handleApprove(e) {
    const { id } = e.currentTarget.dataset;
    
    wx.showLoading({
      title: '处理中...',
    });

    // 模拟审批通过请求
    setTimeout(() => {
      const newList = this.data.approvalList.map(item => {
        if (item.id === id) {
          return { ...item, status: 'approved' };
        }
        return item;
      });

      this.setData({
        approvalList: newList
      });

      wx.hideLoading();
      wx.showToast({
        title: '已通过',
        icon: 'success'
      });
    }, 500);
  },

  handleReject(e) {
    const { id } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '驳回原因',
      editable: true,
      placeholderText: '请输入驳回原因',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...',
          });

          // 模拟驳回请求
          setTimeout(() => {
            const newList = this.data.approvalList.map(item => {
              if (item.id === id) {
                return { 
                  ...item, 
                  status: 'rejected',
                  rejectReason: res.content
                };
              }
              return item;
            });

            this.setData({
              approvalList: newList
            });

            wx.hideLoading();
            wx.showToast({
              title: '已驳回',
              icon: 'success'
            });
          }, 500);
        }
      }
    });
  }
}); 