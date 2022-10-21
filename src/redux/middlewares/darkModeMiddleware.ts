import { darkModeToggle } from '../actions/darkModeActions'


export const handleToggle = (): any => async (dispatch: any) => {
  dispatch(darkModeToggle())
}
