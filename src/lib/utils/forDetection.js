import warn from "assets/cctv1.png";
const { naver } = window;
import { setDateFormat, setTimeFormat } from "lib/utils/forHumanaction";

import moment from "moment";
import "moment/locale/ko";
export function setTable(obj) {
  console.log({ obj });
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
    // title: obj.cctv.address,
    title: "d",
    position: position,
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
// export function makeMarker(map, id, url, i, position) {
//   console.log("마커그리기" + id);
//   return new naver.maps.Marker({
//     map,
//     // title: obj.cctv.address,
//     title: "d",
//     position: position,
//     icon: {
//       content: [
//         '<div id="cctv_marker_icon" >',
//         "<div>",
//         i,
//         "</div>",
//         "<img src='" + warn + "'/>",
//         "</div>",
//       ].join(""),
//       size: new naver.maps.Size(50, 50),
//       anchor: new naver.maps.Point(12, 37),
//     },
//     draggable: true,
//     idValue: id,
//     uriValue: url,
//   });
// }
// useEffect(() => {
//   var marker;
//   const order = detectionOrder.current;
//   console.log({ socketData });
//   marker = makeMarker(
//     map,
//     socketData.id,
//     socketData.url,
//     order,
//     new naver.maps.LatLng(socketData.lat, socketData.lng)
//   );
//   marker.addListener("click", function (e) {
//     //obj.id로 api 요청
//     setId(e.overlay.idValue);
//     setUri(e.overlay.uriValue);
//     setModalOpen(true);
//     setBlur(true);
//   });
//   // setTrackingPath((prev) => [
//   //   ...prev,
//   //   new naver.maps.LatLng(socketData.lat, socketData.lng),
//   // ]);
//   // p.push(new naver.maps.LatLng(socketData.lat, socketData.lng));
// }, [list]);
export function makeMarker(map, list, setId, setUri, setModalOpen, setBlur) {
  for (let i = 0; i < list.length; i++) {
    var obj = list[i];
    var marker = new naver.maps.Marker({
      map,
      // title: obj.cctv.address,
      title: "d",
      position: new naver.maps.LatLng(obj.lat, obj.lng),
      icon: {
        content: [
          '<div id="cctv_marker_number_blue" >',
          "<div>",
          list[i].order,
          "</div>",
          "</div>",
        ].join(""),
        size: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(12, 37),
      },
      draggable: true,
      idValue: obj.id,
      uriValue: obj.url,
    });
    marker.addListener("click", function (e) {
      //obj.id로 api 요청
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
