const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    role: "",
    fullname: "",
  },
  login: false,
  role: [],
};

const authreducer = createSlice({
  name: "authreducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, roleID, fullName } = action.payload;
      state.user = { id, username, email, roleID, fullName };
    },
    loginSuccess: (state) => {
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
      document.location.href = "/";
    },
    setRole: (state, action) => {
      state.role = [...action.payload];
    },
  },
});

export const loginUser =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/", { email, password });
      localStorage.setItem("token", data.token);
      dispatch(setUser(data.user));
      dispatch(loginSuccess());
      alert("login berhasil");
      if (data.user.roleID === 1) navigate("/admin");
      else navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

export const registerUser =
  ({ email, roleID, baseSalary }) =>
  async (dispatch) => {
    try {
      console.log(email, roleID, baseSalary);
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/reg",
        { email, roleID, baseSalary },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("register berhasil");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

export const getRole = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/auth/role");
      dispatch(setRole(data.result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setUser, loginSuccess, logoutSuccess, setRole } = authreducer.actions;
export default authreducer.reducer;
