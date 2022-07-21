import {connect} from 'react-redux'
import ScreenChangepassword from '../Screens/ScreenChangepassword'
import { validatePassword} from "../Modules/user/reducer";
import { changePassword } from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    validatePassword,
    changePassword,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenChangepassword)