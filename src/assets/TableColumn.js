export const columns = [
  { title: "id", field: "id" },

  { title: "type", field: "type", align: "left" },
  // formatter: "tickCross",
  {
    title: "생성시간",
    field: "createdAt",
    align: "center",
    width: 10,
  },
  { title: "start time", field: "start_time" },

  { title: "end time", field: "end_time", align: "center" },
  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
  {
    title: "cctv id",
    field: "cctv_id",
    align: "center",
  },

  {
    title: "cctv 좌표",
    field: "position",
    align: "center",
  },
  {
    title: "cctv 위치",
    field: "address",
    align: "center",
  },
];
export const initialSort = [
  { column: "createdAt", dir: "desc" }, //sort by this first
];
export const columnsforDetaction = [
  { title: "id", field: "id" },
  // {
  //   title: "생성시간",
  //   field: "createdAt",
  //   align: "center",
  // },
  { title: "start time", field: "start_time" },

  { title: "동영상 url", field: "url", align: "center", formatter: "link" },
  // {
  //   title: "cctv id",
  //   field: "cctv_id",
  //   align: "center",
  // },
];
export const initialSortforDetaction = [
  { column: "id", dir: "desc" }, //sort by this first
];
