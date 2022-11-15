import React, { useRef, useState } from "react";
import "./modal.scss";
import NewModal from "./NewModal.js";
// eslint-disable-next-line react/prop-types
function Modal({ open, close, setPrevModalOpen, header, id, uri, setBlur }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
  //   function onClickSubject() {
  //     // close();
  //     // eslint-disable-next-line no-undef
  //     // $(".modalBody").innerHtml("d");
  //     console.log(modalBody.current);
  //     // modalBody.current.innerText("Dd");
  //     // const li = document.createElement("div", {
  //     //   lang: "en",
  //     //   className: "contents",
  //     // });
  //     const li = <p className="ji">dfsd</p>;
  //     modalBody.current.appendChild(li);
  //   }
  const [modalOpen, setModalOpen] = useState(false);
  const onClickSubject = (e) => {
    setModalOpen(true);
    console.log(e.target);
    close();
    setBlur(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };
  console.log({ id });
  console.log(uri);

  console.log(modalOpen ? "새모달" : "새모달 닫힘");
  console.log(open ? "모달" : "모달 닫힘");
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <>
      <div className={open ? "openModal modal" : "modal"}>
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
              <div className="subjectList">
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/201" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/200" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/100" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/310" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/340" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/301" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/302" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/303" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/304" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/305" alt="subject" />
                </button>
                <button onClick={onClickSubject}>
                  <img src="https://i.pravatar.cc/306" alt="subject" />
                </button>
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
      <NewModal
        openModal={modalOpen}
        closeModal={closeModal}
        setPrevModalOpen={setPrevModalOpen}
        id={id}
        uri={uri}
        header="추적대상 선정"
        setBlur={setBlur}
      ></NewModal>
    </>
  );
}
export default Modal;
