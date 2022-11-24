import warn from "assets/cctv1.png";
const { naver } = window;
import { setDateFormat, setTimeFormat } from "lib/utils/forHumanaction";

export function setTable(obj, i) {
  console.log({ obj });
  return {
    order: i,
    id: obj.id,
    createdAt: obj.time,
    start_time: setDateFormat(obj.time) + " " + setTimeFormat(obj.time),
    url: obj.url,
    cctv_id: obj.cctv_id,
    lat: obj.cctv.y,
    lng: obj.cctv.x,
    address: obj.cctv.address,
    markerX: obj.cctv.x,
    markerY: obj.cctv.y,
  };
}
export function setPath(obj) {
  return new naver.maps.LatLng(obj.cctv.y, obj.cctv.x);
}
export function setMarker(map, obj, id, url, i) {
  return new naver.maps.Marker({
    map,
    title: obj.cctv.address,
    position: setPath(obj),
    icon: {
      content: [
        '<div id="cctv_marker_icon" >',
        "<div>",
        i,
        "</div>",
        "<img src='" + warn + "'/>",
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
