import React, { useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/ActivityService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPen,
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import UpdateActivityModal from "./UpdateActivityModal";
import DeleteActivityModal from "./DeleteActivityModal";
import CreateActivityModal from "./CreateActivityModal";
import { TokenContext } from "../App";

const ActivityPage = () => {
  const { token } = useContext(TokenContext);
  const [update, setUpdate] = useState(null);
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState(null);
  const [activities, setActivities] = useState({});
  const [clickedActivity, setClickedActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const size = 6;
  const navigate = useNavigate();

  const { isExpired } = useJwt(token);

  function openUpdateModal(activity) {
    setIsUpdateModalOpen(true);
    setClickedActivity(activity);
  }

  function openCreateModal(activity) {
    setIsCreateModalOpen(true);
    setClickedActivity(activity);
  }

  function openDeleteModal(activity) {
    setIsDeleteModalOpen(true);
    setClickedActivity(activity);
  }

  function goToPreviousPage() {
    if (page <= 0) {
      return;
    }
    setPage(page - 1);
  }

  function goToNextPage() {
    if (page + 1 >= pageInfo.totalPages) {
      return;
    }
    setPage(page + 1);
  }

  useEffect(() => {
    if (isExpired) {
      localStorage.clear();
      navigate("/logg-inn");
    }

    async function fetchActivities() {
      setLoading(true);
      setShowErrorMessage(false);
      try {
        const response = await getActivities(page, size);
        console.log(response);

        if (response.status === 204) {
          setActivities(null);
          setPageInfo(null);
          return;
        }

        if (response.status === 200 && response.data.response === "SUCCESS") {
          setActivities(response.data.result.content);
          setPageInfo(response.data.result.page);
        }
      } catch (error) {
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, [page, update, isExpired]);

  return (
    <>
      <UpdateActivityModal
        setUpdate={setUpdate}
        clickedActivity={clickedActivity}
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setLoading={setLoading}
      />

      <CreateActivityModal
        setUpdate={setUpdate}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        setLoading={setLoading}
      />

      <DeleteActivityModal
        setUpdate={setUpdate}
        clickedActivity={clickedActivity}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setLoading={setLoading}
      />

      <div className="container container--md">
        <div className="text-center">
          <h1>Dine Aktiviteter</h1>
          <p>Se dine kommende aktiviteter!</p>
          <button onClick={openCreateModal} className="button mb-3">
            Lag en ny aktivitet
          </button>
        </div>
        <div>
          {!loading &&
            !showErrorMessage &&
            (!activities || Object.keys(activities).length === 0) && (
              <p className="text-center mb-5" style={{ color: "crimson" }}>
                Du har ingen aktiviteter. Trykk på knappen øverst for å lage en
                ny aktivitet!
              </p>
            )}
          {!loading && activities && Object.keys(activities).length >= 1 && (
            <>
              <div className="activities">
                <div className="activity-size">
                  <small>
                    {pageInfo &&
                      `Du er på side ${page + 1} av ${pageInfo.totalPages} `}
                  </small>
                  <div>
                    <FontAwesomeIcon
                      onClick={goToPreviousPage}
                      className="pagination-button"
                      icon={faArrowLeft}
                    />
                    <FontAwesomeIcon
                      onClick={goToNextPage}
                      className="pagination-button"
                      icon={faArrowRight}
                    />
                  </div>
                </div>
                {activities.map((activity) => (
                  <div key={activity.id} className="activity">
                    <div>
                      <h2>
                        {activity.title} ({activity.date})
                      </h2>
                      <p>{activity.description}</p>
                    </div>
                    <div className="activity-actions">
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => openUpdateModal(activity)}
                        style={{ color: "#5555FF" }}
                        className="m-auto activity-icon"
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => openDeleteModal(activity)}
                        style={{ color: "#DC3544" }}
                        className="m-auto activity-icon"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {loading && <FontAwesomeIcon icon={faSpinner} className="spinner" />}
          {!loading && showErrorMessage && (
            <p className="text-center" style={{ color: "crimson" }}>
              En feil oppstod
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityPage;
