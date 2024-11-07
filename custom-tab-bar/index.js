Component({
  data: {
    active: 0,
    role: '',
    list: {
      student: [
        {
          pagePath: "/pages/student/index/index",
          text: "首页",
          icon: "wap-home-o"
        },
        {
          pagePath: "/pages/student/reservation/reservation",
          text: "预约",
          icon: "calendar-o"
        },
        {
          pagePath: "/pages/student/history/history",
          text: "历史",
          icon: "clock-o"
        }
      ],
      teacher: [
        {
          pagePath: "/pages/teacher/index/index",
          text: "首页",
          icon: "wap-home-o"
        },
        {
          pagePath: "/pages/teacher/approval/approval",
          text: "审批",
          icon: "passed"
        },
        {
          pagePath: "/pages/teacher/venue/venue",
          text: "场地",
          icon: "shop-o"
        }
      ]
    }
  },

  lifetimes: {
    attached() {
      const userInfo = wx.getStorageSync('userInfo');
      console.log('TabBar attached, userInfo:', userInfo);
      this.setData({ role: userInfo.role });
    }
  },

  methods: {
    onChange(event) {
      const index = event.detail;
      const list = this.data.list[this.data.role];
      console.log('TabBar onChange, role:', this.data.role, 'list:', list);
      const url = list[index].pagePath;
      wx.switchTab({ url });
      this.setData({ active: index });
    }
  }
}); 