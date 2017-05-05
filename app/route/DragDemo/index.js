export default {
    path: 'dragdemo',
    indexRoute: {
        getComponent(nextState,cb){
            require.ensure([], (require) => {
                cb(null, require('app/Drag/DragWithJS').default)
            }, 'DragDemo')
        }
    },
}
