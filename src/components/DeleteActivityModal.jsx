import React from "react";
import { deleteActivity } from "../services/ActivityService";
import { useColorScheme } from "./useColorScheme";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import { makeId } from "../util/RandomId";

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "var(--background-color)",
    borderRadius: "var(--outer-radius)",
  },
};

ReactModal.setAppElement("#root");

const DeleteActivityModal = ({
  setUpdate,
  clickedActivity,
  isModalOpen,
  setIsModalOpen,
  setLoading,
}) => {
  const { isDark } = useColorScheme();

  function closeModal() {
    setIsModalOpen(false);
    toast.error("Operasjon avbrytt", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDark ? "dark" : "light",
    });
  }

  async function onUpdateActivity(event) {
    event.preventDefault();

    setLoading(true);

    setIsModalOpen(false);

    try {
      const response = await deleteActivity(clickedActivity.id);

      if (response.status == 200 && response.data.response === "SUCCESS") {
        setUpdate(makeId());
        toast.success("Aktiviteten ble slettet", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: isDark ? "dark" : "light",
        });
      }
    } catch (error) {
      toast.error("En feil oppstod!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      contentLabel="Slett aktivitet"
      style={customModalStyle}
    >
      <h3>Slett aktiviteten</h3>
      <small>
        Aktiviteten som blir slettet: "
        {clickedActivity && clickedActivity.title}"
      </small>
      <p>
        Er du sikker på at du vil slette denne aktiviteten? <br />
        Dette kan ikke angres!
      </p>
      <div className="col-2 text-center">
        <button className="button button__cancel" onClick={closeModal}>
          Kanseller
        </button>

        {clickedActivity && (
          <>
            <button
              onClick={onUpdateActivity}
              className="button button__success"
            >
              Bekreft
            </button>
          </>
        )}
      </div>
    </ReactModal>
  );
};

export default DeleteActivityModal;
