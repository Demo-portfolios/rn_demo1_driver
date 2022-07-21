import {connect} from 'react-redux'
import ScreenBank from '../Screens/ScreenBank'
import { onlinePayment } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    onlinePayment
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenBank)