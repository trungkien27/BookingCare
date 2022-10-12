export const adminMenu = [
  {
    //Nguoi dung
    // subMenus: [
    //   {
    //     name: "menu.system.system-administrator.user-manage",
    //     link: "/system/user-manage",
    //   },
    //   {
    //     name: "menu.system.system-administrator.user-redux",
    //     link: "/system/user-redux",
    //   },
    // ],
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-docter",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
    ],
  },
  {
    //Phong Khám

    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Chuyên Khoa

    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //Cẩm Nang

    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
  {
    //student
    name: "menu.admin.student",
    menus: [
      {
        name: "menu.admin.manage-Student",
        link: "/system/manage-student",
      },
    ],
  },
];
