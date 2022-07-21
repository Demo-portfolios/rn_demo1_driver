import {connect} from 'react-redux'
import ScreenLoading from '../Screens/ScreenLoading'
import {startupWorker} from '../Modules/app/reducer'
const mapStateToProps = state =>({

})
const mapDispatchToProps ={
    startupWorker
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenLoading)