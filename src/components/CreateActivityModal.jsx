import React, { useState } from "react";
import { createActivity } from "../services/ActivityService";
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

const CreateActivityModal = ({
  setUpdate,
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
    if (!inputs.date || !inputs.title || !inputs.description) {
      toast.error("Du må fylle ut alle feltene!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
      return;
    }

    event.preventDefault();

    setLoading(true);

    setIsModalOpen(false);

    try {
      const response = await createActivity(inputs);

      if (response.status == 200 && response.data.response === "SUCCESS") {
        setUpdate(makeId());
        toast.success("Aktiviteten ble opprettet!", {
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
      contentLabel="Lag en ny aktivitet"
      style={customModalStyle}
    >
      <h3>Lag en ny aktivitet</h3>
      <button className="button button__cancel" onClick={closeModal}>
        Kanseller
      </button>

      <input
        onChange={handleChange}
        className="mt-3"
        aria-label="Date"
        type="date"
        name="date"
      />
      <input
        onChange={handleChange}
        className="mt-3"
        name="title"
        placeholder="Skriv inn en tittel for aktiviteten"
      />
      <textarea
        onChange={handleChange}
        className="mt-3"
        name="description"
        placeholder="Skriv inn en beskrivelse for aktiviteten"
      />
      <button onClick={onUpdateActivity} className="button button__success">
        Lag aktivitet
      </button>
    </ReactModal>
  );
};

export default CreateActivityModal;
