import React, { useState } from "react";
import { updateActivity } from "../services/ActivityService";
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

const UpdateActivityModal = ({
  setUpdate,
  clickedActivity,
  isModalOpen,
  setIsModalOpen,
  setLoading,
}) => {
  const [inputs, setInputs] = useState({});

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

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function onUpdateActivity(event) {
    event.preventDefault();

    setLoading(true);

    setIsModalOpen(false);

    try {
      const response = await updateActivity(clickedActivity.id, inputs);

      if (response.status == 200 && response.data.response === "SUCCESS") {
        setUpdate(makeId());
        toast.success("Aktiviteten ble oppdatert", {
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
      contentLabel="Oppdater aktivitet"
      style={customModalStyle}
    >
      <h3>Oppdater aktiviteten</h3>
      <button className="button button__cancel" onClick={closeModal}>
        Kanseller
      </button>

      {clickedActivity && (
        <>
          <input
            onChange={handleChange}
            className="mt-3"
            aria-label="Date"
            type="date"
            name="date"
            defaultValue={clickedActivity.date}
          />
          <input
            onChange={handleChange}
            className="mt-3"
            name="title"
            defaultValue={clickedActivity.title}
          />
          <textarea
            onChange={handleChange}
            className="mt-3"
            name="description"
            defaultValue={clickedActivity.description}
          />
          <button onClick={onUpdateActivity} className="button button__success">
            Lagre
          </button>
        </>
      )}
    </ReactModal>
  );
};

export default UpdateActivityModal;
