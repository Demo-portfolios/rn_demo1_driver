import {connect} from 'react-redux'
import ScreenDel_input from '../Screens/ScreenDel_intput'
import { enterData, getStore } from "../Modules/user/reducer";

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
    enterData,
    getStore
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenDel_input)