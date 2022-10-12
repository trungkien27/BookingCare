import actionTypes from "./actionTypes";
import {
  getAllCodeSevices,
  createNewUserService,
  getAllUser,
  deleteUserSevice,
  updateUserSevice,
  getTopDoctorHomeSevices,
  getAllDoctorSevices,
} from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchGenderStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeSevices("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderfailed());
      }
    } catch (error) {
      dispatch(fetchGenderfailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderdata) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderdata,
});

export const fetchGenderfailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//positions

export const fetchPsoitionStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeSevices("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionfailed());
      }
    } catch (error) {
      dispatch(fetchPositionfailed());
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (posidata) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: posidata,
});

export const fetchPositionfailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
//Role

export const fetchRoleStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeSevices("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRolefailed());
      }
    } catch (error) {
      dispatch(fetchRolefailed());
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (roledata) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roledata,
});

export const fetchRolefailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
//Create user
export const createNewUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast("🦄Create a new user success!");
        dispatch(caretaUSerSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Create a new user error!");
        dispatch(caretaUserfailed());
      }
    } catch (error) {
      dispatch(caretaUserfailed());
      console.log(error);
    }
  };
};

export const caretaUSerSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const caretaUserfailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//get all user

export const fetchAllUserStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUser("ALL");
      // let resdoctor = await getTopDoctorHomeSevices(3);
      // console.log("check resDoctor", resdoctor);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.user.reverse()));
      } else {
        dispatch(fetchAllUserfailed());
      }
    } catch (error) {
      toast.error("🦄List all user error!");
      dispatch(fetchAllUserfailed());
      console.log(error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALLUSER_SUCCESS,
  users: data,
});

export const fetchAllUserfailed = () => ({
  type: actionTypes.FETCH_ALLUSER_FAILED,
});

///delete user

export const DeleteUser = (id) => {
  return async (dispatch) => {
    try {
      let res = await deleteUserSevice(id);
      if (res && res.errCode === 0) {
        toast.success("🦄Delete user success!");
        dispatch(DeleteUSerSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("🦄Delete user error!");
        dispatch(caretaUserfailed());
      }
    } catch (error) {
      dispatch(DeleteUserfailed());
      console.log(error);
    }
  };
};

export const DeleteUSerSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const DeleteUserfailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

///Edit user
export const EditUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await updateUserSevice(data);
      if (res && res.errCode === 0) {
        toast.success("🦄Update user success!");
        dispatch(EditUSerSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("🦄Update user error!");
        dispatch(EditUserfailed());
      }
    } catch (error) {
      dispatch(EditUserfailed());
      console.log(error);
    }
  };
};

export const EditUSerSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const EditUserfailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
//Topdoctor
export const FetchTopDoctor = () => {
  return async (dispatch) => {
    try {
      let res = await getTopDoctorHomeSevices(6);
      if (res && res.errCode === 0) {
        dispatch(TopDoctorSuccess(res));
      } else {
        dispatch(TopDoctorfailed());
      }
      console.log(res);
    } catch (error) {
      dispatch(TopDoctorfailed());
    }
  };
};

export const TopDoctorSuccess = (res) => ({
  type: actionTypes.FETCH_TOPDOCTOR_SUCCESS,
  data: res.data,
});

export const TopDoctorfailed = () => ({
  type: actionTypes.FETCH_TOPDOCTOR_FAILED,
});

//Alldoctor
export const FetchAllDoctor = () => {
  return async (dispatch) => {
    try {
      let res = await getAllDoctorSevices();
      if (res && res.errCode === 0) {
        dispatch(AllDoctorSuccess(res));
      } else {
        dispatch(AllDoctorfailed());
      }
      console.log(res);
    } catch (error) {
      dispatch(AllDoctorfailed());
    }
  };
};

export const AllDoctorSuccess = (res) => ({
  type: actionTypes.FETCH_ALLDOCTOR_SUCCESS,
  data: res.data,
});

export const AllDoctorfailed = () => ({
  type: actionTypes.FETCH_ALLDOCTOR_FAILED,
});
