const data = [
  {
    textures: require('@/assets/livingRoom.jpg'),
    tipsList: [
      {
        position: { x: -200, y: -4, z: -147 },
        content: {
          title: '进入厨房',
          name: 'kitchen',
          text: '',
          image: 1,
          showTip: false,
          showTitle: true,
        },
      },
      {
        position: { x: -100, y: 0, z: -231 },
        content: {
          title: '信息点2',
          name: 'info2',
          text: '77989',
          showTip: true,
          showTitle: false,
        },
      },
      {
        position: { x: 150, y: -50, z: -198 },
        content: {
          title: '信息点3',
          name: 'info3',
          text: 'qwdcz',
          showTip: true,
          showTitle: false,
        },
      },
      {
        position: { x: 210, y: 11, z: -140 },
        content: {
          title: '信息点4',
          name: 'info4',
          text: '大豆食心虫侦察十大大苏打大大大大大大大',
          showTip: true,
          showTitle: false,
        },
      },
      {
        position: { x: 208, y: -12, z: 140 },
        content: {
          title: '信息点5',
          name: 'info5',
          text: 'eq',
          showTip: true,
          showTitle: false,
        },
      },
      {
        position: { x: 86, y: -9, z: 236 },
        content: {
          title: '进入房间',
          name: 'living-room',
          text: '',
          showTip: false,
          showTitle: true,
        },
      },
    ],
  },
  {
    textures: require('@/assets/kitchen.jpg'),
    tipsList: [
      {
        position: { x: -199, y: -24, z: 145 },
        content: {
          title: '进入大厅',
          text: '',
          image: 0,
          showTip: false,
          showTitle: true,
        },
      },
    ],
  },
];

export default data;
