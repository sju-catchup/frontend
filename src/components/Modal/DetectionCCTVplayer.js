import React, { useRef } from "react";
import "./modal.scss";
// eslint-disable-next-line react/prop-types
function Modal({ open, close, header, id, uri }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
  console.log({ id });
  console.log(uri);

  console.log(open ? "모달" : "모달 닫힘");
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
                width="500"
                height="350"
                src={uri}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
