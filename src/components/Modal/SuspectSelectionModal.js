/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./modal.scss";
import NewModal from "./SuspectCheckingModal.js";
import response from "assets/data.json";
// import HttpsService from "lib/api/HttpsService";
// eslint-disable-next-line react/prop-types
function SuspectList({ suspectList, onClickSubject }) {
  const list = [];
  console.log(suspectList);
  // eslint-disable-next-line react/prop-types
  suspectList.map((obj, i) => {
    list.push(
      <button onClick={onClickSubject} key={i}>
        <img src={obj.url} alt="subject" id={obj.id} />
      </button>
    );
  });
  return <>{list}</>;
}
function Modal({
  open,
  close,
  setPrevModalOpen,
  header,
  id,
  uri,
  start,
  end,
  setBlur,
}) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
  const [suspectList, setSuspectList] = useState([]);
  const [suspectId, setSuspectId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState();
  const onClickSubject = (e) => {
    setUrl(e.target.src); //e.target은 img
    setSuspectId(e.target.id);
    setModalOpen(true);
    close();
    setBlur(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setBlur(false);
  };
  useEffect(() => {
    setSuspectList(response.Suspect);
    console.log(start, end);
  }, []);
  // if (open) {
  //   HttpsService.findAllSuspect(id, start, end).then((response) => {
  //     console.log(response);
  //     setSuspectList(response.Suspect);
  //   });
  // }
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
                allowFullScreen
              ></iframe>
              <div className="subjectList">
                <SuspectList
                  suspectList={suspectList}
                  onClickSubject={onClickSubject}
                />
              </div>
            </main>
          </section>
        ) : null}
      </div>
      <NewModal
        openModal={modalOpen}
        closeModal={closeModal}
        setPrevModalOpen={setPrevModalOpen}
        id={id}
        suspectId={suspectId}
        url={url}
        header="추적대상 선정"
        setBlur={setBlur}
      ></NewModal>
    </>
  );
}
export default Modal;
