import {connect} from 'react-redux'
import ScreenReport from '../Screens/ScreenReport'
import { reportDrive } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    reportDrive,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenReport)