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
  id,
  suspectId,
  url,
}) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // const navigate = useNavigate();
  function selectAgain() {
    setPrevModalOpen(true);
    closeModal();
    setBlur(true);
  }
  // function selectSubject() {
  //   navigate("/detection/" + id + "/" + suspectId, { state: partialUser });
  // }
  console.log({ url });
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
              {/* <button onClick={selectSubject}>추적하기</button> */}
              <Link
                to={"/detection/" + id + "/" + suspectId}
                state={{ suspectImgUrl: url }}
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
