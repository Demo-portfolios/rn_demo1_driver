import {connect} from 'react-redux'
import ScreenOrder from '../Screens/ScreenOrder'
import { sendRequireBooking } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    sendRequireBooking,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenOrder)