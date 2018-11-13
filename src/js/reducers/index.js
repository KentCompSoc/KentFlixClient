import { combineReducers } from "redux";
import user from "./user";
import schools from "./schools";
import courses from "./courses";

export default combineReducers({
	user,
	schools,
	courses
})