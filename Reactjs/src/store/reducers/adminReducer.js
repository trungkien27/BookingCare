import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctor: [],
  allDortor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //GENDER
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    //POSITION
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    //ROLE
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    //Get All USer
    case actionTypes.FETCH_ALLUSER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLUSER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //Get Top Doctor
    case actionTypes.FETCH_TOPDOCTOR_SUCCESS:
      state.topDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOPDOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };
    //Get All Doctor
    case actionTypes.FETCH_ALLDOCTOR_SUCCESS:
      state.allDortor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLDOCTOR_FAILED:
      state.allDortor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
