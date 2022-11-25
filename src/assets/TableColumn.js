export const columns = [
  { title: "id", field: "id", width: 10 },

  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  // {
  //   title: "생성시간",
  //   field: "createdAt",
  //   align: "center",
  //   width: 10,
  // },
  { title: "날짜", field: "date" },
  { title: "발생시각", field: "start_time" },

  { title: "종료시각", field: "end_time", align: "center" },
  {
    title: "cctv id",
    field: "cctv_id",
    align: "center",
    width: 10,
  },

  {
    title: "위도",
    field: "lat",
    align: "center",
  },
  {
    title: "경도",
    field: "lng",
    align: "center",
  },
  {
    title: "위치주소",
    field: "address",
    align: "center",
  },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
];
export const initialSort = [
  { column: "id", dir: "desc" }, //sort by this first
];
export const columnsforDetaction = [
  { title: "번호", field: "order", width: 20 },
  {
    title: "cctv id",
    field: "cctv_id",
    align: "center",
    width: 10,
  },
  { title: "포착시각", field: "start_time" },

  {
    title: "위도",
    field: "lat",
    align: "center",
  },
  {
    title: "경도",
    field: "lng",
    align: "center",
  },
  {
    title: "위치주소",
    field: "address",
    align: "center",
  },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
];
export const initialSortforDetaction = [
  { column: "start_time", dir: "asc" }, //sort by this first
];
