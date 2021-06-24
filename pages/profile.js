import { withIronSession } from "next-iron-session";
import { Text } from "@chakra-ui/react";
import { checkAuthentication, getIronConfig } from "../src/utils";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfile } from "../src/helpers/userFetcher";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { fetchMe, loggedInUser, loginError } = useContext(AuthContext);

  useEffect(() => {
    // Refresh creator profile on first load
    fetchMe().then((fetchSuccessful) => {
      if (fetchSuccessful) {
        setProfile(loggedInUser.profile);
        setPlans(loggedInUser.plans);
        setLoading(false);
      } else {
        setError(loginError);
        setLoading(false);
      }
    });
  }, []);

  const handleUpdateProfile = () => {
    // Handle Save profile action
  };

  const hanndleAddPlan = () => {
    // Handle create new Plan
  };

  const handleUpdatePlan = () => {
    // Handle Save plan
  };

  return <Text fontSize="6xl">Profile Page</Text>;
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Profile;
