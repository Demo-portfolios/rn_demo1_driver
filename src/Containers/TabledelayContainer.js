import {connect} from 'react-redux'
import ScreenTabledelay from '../Screens/ScreenTabledelay'
import { listDelay } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listDelay,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenTabledelay)