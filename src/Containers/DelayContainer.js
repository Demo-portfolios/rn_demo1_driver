import {connect} from 'react-redux'
import ScreenDelay from '../Screens/ScreenDelay'
import { confirmDelay } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    confirmDelay
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenDelay)