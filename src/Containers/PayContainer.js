import {connect} from 'react-redux'
import ScreenPay from '../Screens/ScreenPay'
import { confirmReceive } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    confirmReceive
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenPay)