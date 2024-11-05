Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#1AAD19",
    list: [{
      pagePath: "/pages/student/index/index",
      text: "首页",
      icon: "home"
    }, {
      pagePath: "/pages/student/reservation/reservation",
      text: "预约",
      icon: "calendar"
    }, {
      pagePath: "/pages/student/history/history",
      text: "历史",
      icon: "time"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      });
    }
  }
}); 