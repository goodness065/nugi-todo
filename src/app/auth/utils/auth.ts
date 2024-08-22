import { login } from "../slice/auth-slice";
import { Store } from "../../../store";


export function saveSession(token: string) {

    return Store.dispatch(login({ token }));;
  }