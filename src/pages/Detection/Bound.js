import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import $ from "jquery";
const { naver } = window;
function CCTV() {
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
    var sw,
      ne,
      rect,
      bounds,
      projection,
      map = new naver.maps.Map("map", {
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
    naver.maps.Event.once(map, "init", function () {
      bounds = map.getBounds();
      projection = map.getProjection();
      rect = new naver.maps.Rectangle({
        map: map,
        bounds: bounds,
        fillOpacity: 0.2,
        strokeOpacity: 0.2,
        strokeColor: "#00ff00",
        fillColor: "#00ff00",
      });
      sw = new naver.maps.Marker({
        map: map,
        position: bounds.getSW(),
      });
      ne = new naver.maps.Marker({
        map: map,
        position: bounds.getNE(),
      });
    });
    console.log($(".buttons > input"));
    var btns = $(".buttons > input");
    btns.on("click", function (e) {
      e.preventDefault();

      if (this.id === "reduce") {
        bounds = reduce(bounds, 50, 50);
        updateRectangle(bounds);
      } else {
        bounds = expand(bounds, 50, 50);
        updateRectangle(bounds);
      }

      btns.removeClass("control-on");
      $(this).addClass("control-on");
    });

    function updateRectangle(bounds) {
      rect.setBounds(bounds);
      sw.setPosition(bounds.getSW());
      ne.setPosition(bounds.getNE());
    }

    function reduce(bounds, x, y) {
      var sw = bounds.getSW(),
        ne = bounds.getNE(),
        offsetSW = projection.fromCoordToOffset(sw),
        offsetNE = projection.fromCoordToOffset(ne);

      offsetSW.x = offsetSW.x + x;
      offsetSW.y = offsetSW.y - y;
      offsetNE.x = offsetNE.x - x;
      offsetNE.y = offsetNE.y + y;

      return new naver.maps.LatLngBounds(
        projection.fromOffsetToCoord(offsetSW),
        projection.fromOffsetToCoord(offsetNE)
      );
    }

    function expand(bounds, x, y) {
      var sw = bounds.getSW(),
        ne = bounds.getNE(),
        offsetSW = projection.fromCoordToOffset(sw),
        offsetNE = projection.fromCoordToOffset(ne);

      offsetSW.x = offsetSW.x - x;
      offsetSW.y = offsetSW.y + y;
      offsetNE.x = offsetNE.x + x;
      offsetNE.y = offsetNE.y - y;

      return new naver.maps.LatLngBounds(
        projection.fromOffsetToCoord(offsetSW),
        projection.fromOffsetToCoord(offsetNE)
      );
    }
  }, []);
  return (
    <div className="home">
      <Header />
      <main className="contents">
        <section>
          <header>
            <h1>바운더리 설정</h1>
          </header>
          <div>
            <div className="container" id="mapp">
              <div id={"map"} className="a"></div>
              <div className="buttons" id="button">
                <input type="button" value="늘리기" />
                <input type="button" value="줄이기" id="reduce" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CCTV;
