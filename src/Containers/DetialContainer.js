import {connect} from 'react-redux'
import ScreenDetial from '../Screens/ScreenDetial'
const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenDetial)