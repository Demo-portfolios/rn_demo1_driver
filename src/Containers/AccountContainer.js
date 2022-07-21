import {connect} from 'react-redux'
import ScreenAccount from '../Screens/ScreenAccount'
import { userLogout, updateProfile } from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    userLogout,
    updateProfile,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenAccount)