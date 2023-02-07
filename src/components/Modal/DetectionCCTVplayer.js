import React, { useRef } from "react";
import "./modal.scss";
// eslint-disable-next-line react/prop-types, no-unused-vars
function Modal({ open, close, header, id, uri }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
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
              <iframe
                src={uri}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;mute=1"
                allowfullscreen
              ></iframe>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
}
export default Modal;
