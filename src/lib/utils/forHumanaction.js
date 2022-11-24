import moment from "moment";
import "moment/locale/ko";
const { naver } = window;
export function setDateFormat(time) {
  return moment(time).format("YY.MM.DD");
}
export function setTimeFormat(time) {
  return moment(time).format("hh:mm:ss");
}
export function getElem(obj) {
  const elem = {
    id: obj.id,
    type: obj.type,
    createdAt: obj.createdAt,
    date: moment(obj.start_time).format("YY.MM.DD"),
    start_time: setTimeFormat(obj.start_time),
    end_time: setTimeFormat(obj.end_time),
    url: obj.url,
    cctv_id: obj.cctv.id,
    lat: obj.cctv.position.y,
    lng: obj.cctv.position.x,
    address: obj.cctv.address,
  };
  return elem;
}
export function setMarker(
  map,
  obj,
  detectData,
  setDetectData,
  setModalOpen,
  setBlur,
  type,
  color
) {
  var markerPosition;
  var excontent;
  if (type === "_dot") {
    markerPosition = new naver.maps.LatLng(
      parseFloat(obj.position.y),
      parseFloat(obj.position.x)
    );
    excontent = [
      '<div className="cs_mapbridge" id="cctv_marker',
      type,
      color,
      '" >',
      "<div>",
      "</div>",
      "</div>",
    ].join("");
  } else {
    markerPosition = new naver.maps.LatLng(
      parseFloat(obj.cctv.position.y),
      parseFloat(obj.cctv.position.x)
    );
    excontent = [
      '<div className="cs_mapbridge" id="cctv_marker',
      type,
      color,
      '" >',
      "<div>",
      obj.id,
      "</div>",
      "</div>",
    ].join("");
  }
  const marker = new naver.maps.Marker({
    map,
    title: "Green",
    position: markerPosition,
    icon: {
      content: excontent,
      size: new naver.maps.Size(10, 10),
      anchor: new naver.maps.Point(19, 58),
    },
    draggable: true,
    idValue: obj.id,
    urlValue: obj.url,
    startValue: obj.start_time,
    endValue: obj.end_time,
  });
  marker.addListener("click", function (e) {
    //obj.id로 api 요청
    console.log(e.overlay.urlValue);
    setDetectData({
      ...detectData,
      id: e.overlay.idValue,
      url: e.overlay.urlValue,
      start: e.overlay.startValue,
      end: e.overlay.endValue,
    });
    setModalOpen(true);
    setBlur(true);
  });
}
export function pushToList(socketData, socketList, obj, elem) {
  socketList.push(elem);
  socketData.push(elem);
}
