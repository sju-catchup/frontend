/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./modal.scss";
// eslint-disable-next-line react/prop-types
function Modal({
  openModal,
  closeModal,
  setPrevModalOpen,
  setBlur,
  header,
  suspectData,
  suspectId,
  url,
}) {
  function selectAgain() {
    setPrevModalOpen(true);
    closeModal();
    setBlur(true);
  }
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
              <img src={url} alt="subject" />
            </div>
            <div className="subjectSelect">
              <Link
                to={"/detection/" + suspectId}
                state={{ suspectImgUrl: url, suspectData: suspectData }}
              >
                추적하기
              </Link>
              <button onClick={selectAgain}>다시 선택</button>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
}
export default Modal;
