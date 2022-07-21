import {connect} from 'react-redux'
import ScreenWebReceipt from '../Screens/ScreenWebReceipt'

const mapStateToProps = state =>({
    ...state
})
const mapDispatchToProps ={
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenWebReceipt)