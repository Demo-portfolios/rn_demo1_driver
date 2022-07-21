import {connect} from 'react-redux'
import ScreenPrivacyPolicy from '../Screens/ScreenPrivacyPolicy'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenPrivacyPolicy)