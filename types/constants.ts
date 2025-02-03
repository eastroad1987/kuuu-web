export enum YNEnum {
  Y = "Y",
  N = "N",
}

export const eqOrLikeQuery = [
  {
    key: '/users/admin',
    selectType: ['withDrawYn', 'gender'],
  },
  {
    key: '/companies/admin',
    selectType: ['companyTypeCode', 'isHotYn'],
  },
  {
    key: '/job-posting/admin',
    selectType: ['companyTypeCode', 'status'],
  },
  {
    key: '/devices-programs/admin',
    selectType: ['category'],
  },
  {
    key: '/articles/admin',
    selectType: ['boardId'],
  },
];
