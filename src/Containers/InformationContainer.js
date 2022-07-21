import {connect} from 'react-redux'
import ScreenInformation from '../Screens/ScreenInformation'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenInformation)