import { useState } from "react";
import { StatsWrapper, StatsElement } from "../../style";
import { numFormatter } from "../../../../utils/utils";
import FollowersModal from "../../../../components/Followers";
const Stats = ({ user, posts }) => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    whichOne: "following",
  });

  return (
    <>
      <StatsWrapper>
        <StatsElement>
          Posty:
          <span>
            <strong>{posts.length}</strong>
          </span>
        </StatsElement>
        <StatsElement>
          <button
            onClick={() =>
              setModalData({ isOpen: true, whichOne: "followers" })
            }
          >
            <strong>{numFormatter(user.followers.length, 0)}</strong>
            Obserwujacych
          </button>
        </StatsElement>
        <StatsElement>
          <button
            onClick={() =>
              setModalData({
                isOpen: true,
                whichOne: "following",
              })
            }
          >
            Obserwuje:
            <strong>{numFormatter(user.followingUsers.length, 2)}</strong>
          </button>
        </StatsElement>
      </StatsWrapper>
      {modalData.isOpen ? (
        <FollowersModal
          whichOne={modalData.whichOne}
          closeModal={() =>
            setModalData({ isOpen: false, whichOne: "following" })
          }
        />
      ) : null}
    </>
  );
};

export default Stats;
