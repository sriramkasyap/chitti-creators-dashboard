import { withIronSession } from "next-iron-session";
import { Text } from "@chakra-ui/react";

import {
  checkAuthentication,
  getIronConfig,
  ucFirst,
  validateURL,
} from "../src/utils";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addPlan, updatePlan, updateProfile } from "../src/helpers/userFetcher";

const Profile = () => {
  const [profile, setProfile] = useState({}); // Profile Content of the creator
  const [plans, setPlans] = useState([]); // Plans content of the creator
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const { fetchMe, loggedInUser, loginError } = useContext(AuthContext); // Loading user data from the Authentication Context

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
    setLoading(true);
    if (validateProfile()) {
      updateProfile(profile)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Profile Saved successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const addPlan = (planIdToEdit) => {
    // Handle create new Plan
    setLoading(true);
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      addPlan(plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const updatePlan = (planIdToEdit) => {
    // Handle Save plan
    setLoading(true);
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      updatePlan(planIdToEdit, plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const validateProfile = () => {
    setError("");
    var { fullName, shortBio, longBio, displayPicture } = profile;

    if (
      fullName &&
      shortBio &&
      longBio &&
      displayPicture &&
      fullName.length > 0 &&
      shortBio.length > 0 &&
      longBio.length > 0 &&
      displayPicture.length > 0
    ) {
      if (validateURL(displayPicture)) {
        return true;
      } else {
        setError("Invalid Display picture url");
        return false;
      }
    } else {
      setError("Please fill all the details");
      return false;
    }
  };

  const validatePlan = (plan) => {
    setError("");
    var { planFee, planFeatures } = plan;

    if (
      planFee !== null &&
      planFee !== undefined &&
      planFeatures &&
      planFeatures.length > 0
    ) {
      var flag = true;
      planFeatures.some((feature) => {
        if (!feature || !feature.length > 0) {
          flag = false;
          return false;
        }
      });
      return flag;
    } else {
      setError("Please add features for the plan");
      return false;
    }
  };

  return (
    <>
      <Text fontSize="6xl">Profile Page</Text>
    </>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Profile;
