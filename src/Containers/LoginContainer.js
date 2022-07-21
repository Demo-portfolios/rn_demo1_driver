import {connect} from 'react-redux'
import ScreenLogin from '../Screens/ScreenLogin'
import { userLogin } from "../Modules/user/reducer";

const mapStateToProps= state =>({
    ...state
})
const mapDispatchToProps = {
    userLogin,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenLogin)