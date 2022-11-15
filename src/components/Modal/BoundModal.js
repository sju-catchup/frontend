import React, { useRef, useEffect } from "react";
import "./modal.scss";
const { naver } = window;
// eslint-disable-next-line react/prop-types
function Modal({ open, close, header, id, uri }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
  console.log({ id });
  console.log(uri);

  console.log(open ? "모달" : "모달 닫힘");
  var position = [
    new naver.maps.LatLng(37.562623, 127.083262),
    new naver.maps.LatLng(37.562026, 127.084997),
    new naver.maps.LatLng(37.563058, 127.087702),
    new naver.maps.LatLng(37.56143, 127.080287),
    new naver.maps.LatLng(37.560518, 127.085579),
    new naver.maps.LatLng(37.559542, 127.09011),
    new naver.maps.LatLng(37.558323, 127.078625),
    new naver.maps.LatLng(37.55882, 127.083235),
    new naver.maps.LatLng(37.556076, 127.086463),
  ];
  useEffect(() => {
    var map = new naver.maps.Map("map", {
      zoom: 16,
      center: new naver.maps.LatLng(37.560518, 127.085579),
    });
    for (let i = 0; i < 9; i++) {
      new naver.maps.Marker({
        map,
        title: "j",
        position: position[i],
        icon: {
          content: [
            '<div className="cs_mapbridge" id="cctv_marker_dot" >',
            "</div>",
          ].join(""),
          size: new naver.maps.Size(10, 10),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    }
  }, []);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <>
      <div className={open ? "openModal modal detection" : "modal detection"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main ref={modalBody}>
              <div className="container" id="mapp">
                <div id={"map"} className="a"></div>
                <div className="buttons" id="button">
                  <input type="button" value="바운드 늘리기" />
                  <input type="button" value="바운드 줄이기" id="reduce" />
                </div>
              </div>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
}
export default Modal;
