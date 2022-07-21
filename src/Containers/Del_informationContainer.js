import {connect} from 'react-redux'
import ScreenDel_information from '../Screens/ScreenDel_information'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenDel_information)