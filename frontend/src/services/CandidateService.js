import API from "./api";

const CandidateService = {
  // GET /api/candidates/profile/{userId}
  getProfile: (userId) => {
    return API.get(`/candidates/profile/${userId}`);
  },

  // PUT /api/candidates/profile/{userId}
  updateProfile: (userId, profileData) => {
    return API.put(`/candidates/profile/${userId}`, profileData);
  },
};

export default CandidateService;
