import {connect} from 'react-redux'
import { requestBookingDone } from "../Modules/user/reducer";
import ScreenMap from '../Screens/ScreenMap'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    requestBookingDone,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenMap)