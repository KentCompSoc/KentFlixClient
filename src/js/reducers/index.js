import { combineReducers } from "redux";
import user from "./user";
import schools from "./schools";
import courses from "./courses";
import modules from "./modules";
import lectures from "./lectures";
import error from "./error";

export default combineReducers({
	user,
	error,
	schools,
	courses,
	modules,
	lectures
})