export const TASKS = [
  {
    id: "task1",
    number: 1,
    title: "瀏覽分類",
  },
  {
    id: "task2",
    number: 2,
    title: "商品搜尋",
  },
  {
    id: "task3",
    number: 3,
    title: "篩選排序",
  },
  {
    id: "task4",
    number: 4,
    title: "加入購物車",
  },
  {
    id: "task5",
    number: 5,
    title: "尋找客服頁面",
  },
];

export const EMPTY_PROFILE = {
  gender: null,
  age: null,
  appUsedBefore: null,
  onlineShopFreq: null,
};

export const PROFILE_QUESTIONS = [
  {
    id: "gender",
    label: "Q1 生理性別",
    options: ["男", "女", "其他", "不願透露"],
  },
  {
    id: "age",
    label: "Q2 年齡",
    options: ["18 歲以下", "18–24 歲", "25–34 歲", "35–44 歲", "45–54 歲", "55 歲以上"],
  },
  {
    id: "appUsedBefore",
    label: "Q3 你是否使用過 UNIQLO App？",
    options: ["是", "否"],
  },
  {
    id: "onlineShopFreq",
    label: "Q4 您多久線上購物一次？",
    options: ["每週", "每月", "每季", "很少", "幾乎不"],
  },
];

export const SUS_QUESTIONS = [
  "我覺得會經常使用這個 App",
  "我覺得這個 App 沒有必要這麼複雜",
  "我覺得這個 App 容易使用",
  "我覺得需要技術支援才能使用這個 App",
  "我覺得這個 App 的各項功能整合得很好",
  "我覺得這個 App 有太多不一致之處",
  "我覺得大多數人都能很快學會使用這個 App",
  "我覺得使用這個 App 時感到笨拙",
  "我使用這個 App 時感到很有信心",
  "我需要先學很多東西才能使用這個 App",
];
