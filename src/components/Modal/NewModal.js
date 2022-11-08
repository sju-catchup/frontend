/* eslint-disable react/prop-types */
import React from "react";
// import { useEffect } from "react";
import "./modal.scss";
// eslint-disable-next-line react/prop-types
function Modal({
  openModal,
  closeModal,
  setPrevModalOpen,
  setBlur,
  header,
  id,
  uri,
}) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  function selectAgain() {
    setPrevModalOpen(true);
    closeModal();
    setBlur(true);
  }
  console.log({ id });
  console.log(uri);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={openModal ? "openModal modal" : "modal"}>
      {openModal ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main>
            <div className="subject">
              <img src="https://picsum.photos/300/300/?random" alt="subject" />
            </div>
            <div className="subjectSelect">
              <button>추적대상 맞음</button>
              <button onClick={selectAgain}>다시 선택</button>
            </div>
          </main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
}
export default Modal;
