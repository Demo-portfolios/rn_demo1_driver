import {connect} from 'react-redux'
import { listReport } from "../Modules/user/reducer";
import ScreenShopname from '../Screens/ScreenShopname'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    listReport
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenShopname)