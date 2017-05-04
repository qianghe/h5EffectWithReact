import React , { Component } from 'react'
import './DragWithJS.scss'

export default class DragWithJS extends Component{
    constructor(props){
        super(props);

        this.state = {
            moveX: 0,
            moveY: 0,
            instance : null,
        }

        this.instance = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    componentDidMount(){
        let $dom = this.refs.dragBox;
        let doc = document.body || document.documentElement;

        //注册拖拽事件
        //鼠标mousedown事件记录按下鼠标时，事件发生的开始位置
        //clientX与pageX的区别
        $dom.addEventListener('touchstart', (e)=>{
            let offsetLeft = $dom.offsetLeft;
            let offsetTop = $dom.offsetTop;

            this.instance = {
                elem: $dom,
                width: $dom.offsetWidth,
                height: $dom.offsetHeight,
            }

            this.offsetX = e.touches[0].clientX - offsetLeft;
            this.offsetY = e.touches[0].clientY - offsetTop;
        })

        //鼠标mouseup事件记录按下鼠标时，清除
        $dom.addEventListener('touchend',(e)=>{
            this.instance = null;
        })

        //鼠标mousemove事件记录鼠标的移动
        $dom.addEventListener('touchmove',(e)=>{
            if(this.instance){
                let scrollTop = doc.scrollTop;
                let scrollLeft = doc.scrollLeft;

                let moveX = e.touches[0].clientX - this.offsetX + scrollLeft;
                let moveY = e.touches[0].clientY - this.offsetY + scrollTop;

                //边界判断，不能超出上下左右四个边界
                let top = Math.max(0, Math.min(moveY, doc.scrollHeight- this.instance.height));
                let left = Math.max(0, Math.min(moveX, doc.scrollWidth- this.instance.width));

                this.setState({
                    moveX: left,
                    moveY: top,
                })
            }
        })

    }

    render(){
        let dragBoxStyle = {
            left: this.state.moveX,
            top: this.state.moveY,
        }

        return (
            <div className="container">
                <div className="drag-box" style={dragBoxStyle} ref="dragBox"></div>
            </div>
        )
    }
}
