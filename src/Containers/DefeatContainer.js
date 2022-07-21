import {connect} from 'react-redux'
import ScreenDefeat from '../Screens/ScreenDefeat'
import { confirmReturn } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    confirmReturn,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenDefeat)