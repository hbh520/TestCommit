Page({
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
  },
  handleClick(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      [`visible${id}`]: true,
    });
  },
  handleClose() {
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    });
  },
});
