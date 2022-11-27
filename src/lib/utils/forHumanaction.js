import moment from "moment";
import "moment/locale/ko";
const { naver } = window;
export function setDateFormat(time) {
  return moment(time).format("YY.MM.DD");
}
export function setTimeFormat(time) {
  return moment(time).format("hh:mm:ss");
}
export function getElem(obj, method) {
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
    method: method,
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
    idValue: obj.cctv_id,
    urlValue: obj.url,
    startValue: obj.start_time,
    endValue: obj.end_time,
  });
  marker.addListener("click", function (e) {
    //obj.id로 api 요청
    setDetectData({
      ...detectData,
      cctv_id: e.overlay.idValue,
      url: e.overlay.urlValue,
      start: e.overlay.startValue,
      end: e.overlay.endValue,
    });
    setModalOpen(true);
    setBlur(true);
  });
}
export function makeMarker(
  map,
  list,
  detectData,
  setDetectData,
  setModalOpen,
  setBlur,
  type
) {
  var markerPosition;
  var excontent;
  for (let i = 0; i < list.length; i++) {
    var obj = list[i];
    var color = obj.method === "socket" ? "_red" : "";
    console.log(obj);
    if (type === "_dot") {
      markerPosition = new naver.maps.LatLng(
        parseFloat(obj.position.y),
        parseFloat(obj.position.x)
      );
    } else {
      var id = obj.id;
      markerPosition = new naver.maps.LatLng(
        parseFloat(obj.lat),
        parseFloat(obj.lng)
      );
    }
    excontent = [
      '<div id="cctv_marker',
      type,
      color,
      '" >',
      "<div>",
      id,
      "</div>",
      "</div>",
    ].join("");
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
      idValue: obj.cctv_id,
      urlValue: obj.url,
      startValue: obj.start_time,
      endValue: obj.end_time,
      lngValue: obj.lng,
      latValue: obj.lat,
    });
    if (type === "_number") {
      marker.addListener("click", function (e) {
        //obj.id로 api 요청
        setDetectData({
          ...detectData,
          cctv_id: e.overlay.idValue,
          url: e.overlay.urlValue,
          start: e.overlay.startValue,
          end: e.overlay.endValue,
          lat: parseFloat(e.overlay.latValue),
          lng: parseFloat(e.overlay.lngValue),
        });
        setModalOpen(true);
        setBlur(true);
      });
    }
  }
}
export function pushToList(socketData, socketList, obj, elem) {
  socketList.push(elem);
  socketData.push(elem);
  console.log(socketList, socketData);
}
