/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import "./modal.scss";
import NewModal from "./SuspectCheckingModal.js";
// import response from "assets/data.json";
import HttpsService from "lib/api/HttpsService";
// eslint-disable-next-line react/prop-types
function SuspectList({ suspectList, onClickSubject }) {
  const list = [];
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
  suspectData,
  setBlur,
}) {
  // console.log(suspectData);
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const modalBody = useRef();
  const [isLoading, setIsLoading] = useState(true);
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
  // useEffect(() => {
  //   setSuspectList(response.Suspect);
  //   console.log(suspectData.start, suspectData.end);
  //   setIsLoading(false);
  // }, []);

  //api
  if (open) {
    HttpsService.findAllSuspect(
      suspectData.cctv_id,
      suspectData.start,
      suspectData.end
    )
      .then((response) => {
        setSuspectList(response.data.Suspect);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
                src={suspectData.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="subjectList">
                {isLoading ? (
                  ""
                ) : (
                  <SuspectList
                    suspectList={suspectList}
                    onClickSubject={onClickSubject}
                  />
                )}
              </div>
            </main>
          </section>
        ) : null}
      </div>
      <NewModal
        openModal={modalOpen}
        closeModal={closeModal}
        setPrevModalOpen={setPrevModalOpen}
        suspectData={suspectData}
        suspectId={suspectId}
        url={url}
        header="추적대상 선정"
        setBlur={setBlur}
      ></NewModal>
    </>
  );
}
export default Modal;
