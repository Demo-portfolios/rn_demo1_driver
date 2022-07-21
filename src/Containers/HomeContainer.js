import {connect} from 'react-redux'
import ScreenHome from '../Screens/ScreenHome'
import { siteInformation } from "../Modules/user/reducer";
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    siteInformation
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHome)