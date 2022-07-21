import {connect} from 'react-redux'
import ScreenQRcode from '../Screens/ScreenQRcode'
import { searchPackage } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    searchPackage,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenQRcode)