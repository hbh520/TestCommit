Page({
  data: {
    options: [{
        text: '最高评分',
        type: 'sort',
      },
      {
        text: '风格',
        type: 'radio',
        options: [{
            text: '全部',
          },
          {
            text: '原创',
          },
          {
            text: '漫改',
          },
          {
            text: '轻改',
          },
          {
            text: '游戏改',
          },
          {
            text: '动态漫',
          },
          {
            text: '布袋戏',
          },
          {
            text: '热血',
          },
          {
            text: '奇幻',
          },
          {
            text: '战斗',
          },
          {
            text: '搞笑',
          },
          {
            text: '日常',
          },
          {
            text: '科幻',
          },
          {
            text: '萌系',
          },
          {
            text: '治愈',
          },
          {
            text: '校园',
          },
        ],
      },
      {
        text: '类型',
        type: 'checkbox',
        options: [{
            text: '国产',
          },
          {
            text: '正片',
          },
          {
            text: '剧场版',
          },
          {
            text: '日本动漫',
          },
          {
            text: '其他',
          },
        ],
      },
      {
        text: '筛选',
        type: 'filter',
        slotName: 'filter',
      },
    ],
    radioOptions: ["全部", "正片", "剧场版", "其他"],
    checkboxOptions: [{
      label: "免费"
    }, {
      label: "付费"
    }, {
      label: "大会员"
    }],
  },
  handleChange(e) {
    console.log(e);
  },
});