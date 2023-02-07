const { naver } = window;
import { setDateFormat, setTimeFormat } from "lib/utils/forHumanaction";

import moment from "moment";
import "moment/locale/ko";
export function setTable(obj) {
  return {
    order: "",
    id: obj.id,
    start_time: setDateFormat(obj.time) + " " + setTimeFormat(obj.time),
    time: moment(obj.time).format("YYMMDDhhmmss"),
    url: obj.url,
    cctv_id: obj.cctv_id,
    lat: obj.cctv.y,
    lng: obj.cctv.x,
    address: obj.cctv.address,

    position: new naver.maps.LatLng(obj.cctv.y, obj.cctv.x),
  };
}
export function setPath(obj) {
  return new naver.maps.LatLng(obj.lat, obj.lng);
}
export function setMarker(map, obj, id, url, i, position) {
  return new naver.maps.Marker({
    map,
    title: "d",
    position: position,
    icon: {
      content: [
        '<div id="cctv_marker_icon" >',
        "<div>",
        i,
        "</div>",
        "</div>",
      ].join(""),
      size: new naver.maps.Size(50, 50),
      anchor: new naver.maps.Point(12, 37),
    },
    draggable: true,
    idValue: id,
    uriValue: url,
  });
}
export function makeMarker(map, list, setId, setUri, setModalOpen, setBlur) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
    var obj = list[i];
    var date = list[i].start_time.split(" ")[0];
    var time = list[i].start_time.split(" ")[1];
    var marker = new naver.maps.Marker({
      map,
      title: obj.address,
      position: new naver.maps.LatLng(obj.lat, obj.lng),
      icon: {
        content: [
          "<div id='upper_marker'>",
          '<div id="cctv_marker_number_blue" >',
          "<div>",
          list[i].order,
          "</div>",
          "</div>",
          "<div id='time'>",
          "<div>",
          date,
          "</div>",
          "<div>",
          time,
          "</div>",
          "</div>",
          "</div>",
        ].join(""),
        size: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(12, 37),
      },
      draggable: false,
      idValue: obj.id,
      uriValue: obj.url,
    });
    marker.addListener("click", function (e) {
      setId(e.overlay.idValue);
      setUri(e.overlay.uriValue);
      setModalOpen(true);
      setBlur(true);
    });
  }
}
export function setPolyline(map, prev, cur) {
  return new naver.maps.Polyline({
    map: map,
    path: [prev, cur],
    strokeLineCap: "round",
    strokeWidth: "0.025",
    strokeLineJoin: "round",
    strokeWeight: 8,
    strokeColor: "#2840a5",
    strokeOpacity: 0.8,
  });
}
