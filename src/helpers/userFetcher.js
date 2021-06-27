import { serializeObject } from "../utils";

export const getNewsletters = async (filters = {}) => {
  return fetch(`/api/newsletters?${serializeObject(filters)}`).then((r) =>
    r.json()
  );
};

export const getSubscribers = async () => {
  return fetch(`/api/subscribers`).then((r) => r.json());
};

export const updateProfile = async (profile) => {
  return fetch("/api/creators/profile", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ profile }),
  }).then((r) => r.json());
};

export const addPlan = async (plan) => {
  return fetch("/api/creators/plans", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(plan),
  }).then((r) => r.json());
};

export const updatePlan = async (planId, plan) => {
  return fetch(`/api/creators/plans/${planId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(plan),
  }).then((r) => r.json());
};

export const createNewsletter = async (newsletter) => {
  return fetch(`/api/newsletters`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ newsletter }),
  }).then((r) => r.json());
};
